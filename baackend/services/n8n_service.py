from flask import jsonify, request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests
import os
from datetime import datetime

def init_n8n_service(app):
    """Initialize n8n service with configuration"""
    app.config['N8N_BASE_URL'] = os.getenv('N8N_BASE_URL', 'http://localhost:5678')
    app.config['N8N_WEBHOOK_SECRET'] = os.getenv('N8N_WEBHOOK_SECRET', 'your-secret-key')

class N8NService:
    @staticmethod
    @jwt_required()
    def execute_workflow(workflow_id, payload=None):
        """
        Execute an n8n workflow
        
        Args:
            workflow_id (str): The ID of the workflow to execute
            payload (dict): Optional payload to send to the workflow
            
        Returns:
            dict: Response from n8n
        """
        n8n_url = f"{current_app.config['N8N_BASE_URL']}/webhook/{workhook_id}"
        
        try:
            headers = {
                'Content-Type': 'application/json',
                'X-n8n-webhook-secret': current_app.config['N8N_WEBHOOK_SECRET']
            }
            
            response = requests.post(
                n8n_url,
                json=payload or {},
                headers=headers
            )
            
            if response.status_code == 200:
                return {
                    'success': True,
                    'data': response.json(),
                    'timestamp': datetime.utcnow().isoformat()
                }
            else:
                return {
                    'success': False,
                    'error': f"n8n API error: {response.text}",
                    'status_code': response.status_code
                }
                
        except requests.exceptions.RequestException as e:
            return {
                'success': False,
                'error': f"Failed to connect to n8n: {str(e)}",
                'status_code': 500
            }
    
    @staticmethod
    def get_workflows():
        """
        List all available workflows (requires n8n API key)
        """
        try:
            response = requests.get(
                f"{current_app.config['N8N_BASE_URL']}/rest/workflows",
                headers={
                    'X-N8N-API-KEY': current_app.config.get('N8N_API_KEY', '')
                }
            )
            
            if response.status_code == 200:
                return response.json()
            return []
            
        except Exception as e:
            current_app.logger.error(f"Error fetching n8n workflows: {str(e)}")
            return []

# API Routes
def create_n8n_routes(bp):
    """Create n8n service API routes"""
    
    @bp.route('/n8n/execute', methods=['POST'])
    @jwt_required()
    def execute_workflow():
        data = request.get_json()
        workflow_id = data.get('workflow_id')
        payload = data.get('payload', {})
        
        if not workflow_id:
            return jsonify({
                'success': False,
                'message': 'workflow_id is required'
            }), 400
            
        result = N8NService.execute_workflow(workflow_id, payload)
        return jsonify(result), 200 if result['success'] else 400
    
    @bp.route('/n8n/workflows', methods=['GET'])
    @jwt_required()
    def list_workflows():
        workflows = N8NService.get_workflows()
        return jsonify({
            'success': True,
            'data': workflows
        })
        
    return bp
