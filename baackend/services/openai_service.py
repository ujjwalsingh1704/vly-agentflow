import os
import openai
from flask import jsonify, request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from openai import OpenAI

class OpenAIService:
    def __init__(self, app=None):
        self.client = None
        if app is not None:
            self.init_app(app)
    
    def init_app(self, app):
        """Initialize OpenAI client with configuration"""
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            raise ValueError("OPENAI_API_KEY environment variable is not set")
            
        self.client = OpenAI(api_key=api_key)
        app.config['OPENAI_DEFAULT_MODEL'] = os.getenv('OPENAI_DEFAULT_MODEL', 'gpt-4o')
        app.config['OPENAI_MAX_TOKENS'] = int(os.getenv('OPENAI_MAX_TOKENS', 2000))
        app.config['OPENAI_TEMPERATURE'] = float(os.getenv('OPENAI_TEMPERATURE', 0.7))
    
    def chat_completion(self, messages, model=None, **kwargs):
        """
        Generate chat completion using OpenAI's API
        
        Args:
            messages (list): List of message dictionaries with 'role' and 'content'
            model (str, optional): Model to use. Defaults to configured default.
            **kwargs: Additional parameters for the API call
            
        Returns:
            dict: API response with completion
        """
        if not self.client:
            raise RuntimeError("OpenAIService not initialized with app")
            
        try:
            response = self.client.chat.completions.create(
                model=model or current_app.config['OPENAI_DEFAULT_MODEL'],
                messages=messages,
                max_tokens=kwargs.get('max_tokens', current_app.config['OPENAI_MAX_TOKENS']),
                temperature=kwargs.get('temperature', current_app.config['OPENAI_TEMPERATURE']),
                **{k: v for k, v in kwargs.items() 
                   if k not in ['max_tokens', 'temperature']}
            )
            return {
                'success': True,
                'data': {
                    'id': response.id,
                    'model': response.model,
                    'usage': dict(response.usage),
                    'choices': [{
                        'message': dict(choice.message),
                        'finish_reason': choice.finish_reason
                    } for choice in response.choices]
                }
            }
            
        except Exception as e:
            current_app.logger.error(f"OpenAI API error: {str(e)}")
            return {
                'success': False,
                'error': str(e),
                'type': type(e).__name__
            }
    
    def generate_embeddings(self, text, model="text-embedding-3-small"):
        """
        Generate embeddings for the input text
        
        Args:
            text (str or list): Text or list of texts to generate embeddings for
            model (str): Embedding model to use
            
        Returns:
            dict: API response with embeddings
        """
        if not self.client:
            raise RuntimeError("OpenAIService not initialized with app")
            
        try:
            response = self.client.embeddings.create(
                input=text,
                model=model
            )
            
            return {
                'success': True,
                'data': {
                    'model': response.model,
                    'usage': dict(response.usage),
                    'embeddings': [{
                        'object': emb.object,
                        'embedding': emb.embedding,
                        'index': emb.index
                    } for emb in response.data]
                }
            }
            
        except Exception as e:
            current_app.logger.error(f"OpenAI Embeddings error: {str(e)}")
            return {
                'success': False,
                'error': str(e),
                'type': type(e).__name__
            }

# Initialize the service instance
openai_service = OpenAIService()

def create_openai_routes(bp):
    """Create OpenAI service API routes"""
    
    @bp.route('/openai/chat', methods=['POST'])
    @jwt_required()
    def chat():
        data = request.get_json()
        messages = data.get('messages')
        
        if not messages:
            return jsonify({
                'success': False,
                'message': 'messages array is required'
            }), 400
            
        result = openai_service.chat_completion(
            messages=messages,
            model=data.get('model'),
            max_tokens=data.get('max_tokens'),
            temperature=data.get('temperature')
        )
        
        return jsonify(result), 200 if result['success'] else 500
    
    @bp.route('/openai/embeddings', methods=['POST'])
    @jwt_required()
    def embeddings():
        data = request.get_json()
        text = data.get('text')
        
        if not text:
            return jsonify({
                'success': False,
                'message': 'text is required'
            }), 400
            
        result = openai_service.generate_embeddings(
            text=text,
            model=data.get('model', 'text-embedding-3-small')
        )
        
        return jsonify(result), 200 if result['success'] else 500
    
    return bp
