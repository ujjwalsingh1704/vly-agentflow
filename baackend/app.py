import os
from flask import Flask, jsonify, request, session, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from flask_migrate import Migrate
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity, get_jwt
)
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from functools import wraps

# Load environment variables
load_dotenv()

# Initialize app
app = Flask(__name__, static_folder='../build', static_url_path='')

# Configuration
app.config.update(
    SECRET_KEY=os.getenv("SECRET_KEY", "dev_secret_key_123"),
    JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY", "jwt_super_secret_key_123"),
    JWT_ACCESS_TOKEN_EXPIRES=timedelta(hours=1),
    JWT_REFRESH_TOKEN_EXPIRES=timedelta(days=30),
    UPLOAD_FOLDER='uploads',
    MAX_CONTENT_LENGTH=16 * 1024 * 1024,  # 16MB max upload
    SQLALCHEMY_DATABASE_URI=os.getenv('DATABASE_URL', 'sqlite:///vly_agentflow.db'),
    SQLALCHEMY_TRACK_MODIFICATIONS=False
)

# Initialize extensions
CORS(app, supports_credentials=True)
jwt = JWTManager(app)

# Initialize the database
from models import db, init_db

db.init_app(app)
migrate = Migrate(app, db)

# Import models after db is initialized to avoid circular imports
from models import User, Lead, Conversation, Message, VoiceAgent, CallLog

# Initialize the database with models
init_db(app)

# Register blueprints
from routes.auth import auth_bp
from routes.leads import leads_bp
from routes.conversations import conversation_bp
from routes.voice_agents import voice_agent_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(leads_bp, url_prefix='/api/leads')
app.register_blueprint(conversation_bp, url_prefix='/api/conversations')
app.register_blueprint(voice_agent_bp, url_prefix='/api/voice-agents')

# Create uploads directory
with app.app_context():
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Authentication decorator
def token_required(f):
    @wraps(f)
    @jwt_required()
    def decorated(*args, **kwargs):
        current_user_id = get_jwt_identity()
        if not current_user_id:
            return jsonify({'message': 'Invalid token!'}), 403
        return f(current_user_id, *args, **kwargs)
    return decorated

# User Registration
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered'}), 400
    
    # Create new user
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(
        email=data['email'],
        password_hash=hashed_password,
        name=data.get('name'),
        company=data.get('company')
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    # Create access and refresh tokens
    access_token = create_access_token(identity=new_user.id)
    refresh_token = create_refresh_token(identity=new_user.id)
    
    return jsonify({
        'message': 'User registered successfully',
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': new_user.to_dict()
    }), 201

# User Login
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    # Create tokens
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    
    return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': user.to_dict()
    }), 200

# Token Refresh
@app.route('/api/auth/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    new_token = create_access_token(identity=current_user_id)
    return jsonify({'access_token': new_token}), 200

# Protected Route Example
@app.route('/api/protected', methods=['GET'])
@token_required
def protected_route(current_user_id):
    user = User.query.get(current_user_id)
    return jsonify({
        'message': 'This is a protected route',
        'user': user.to_dict()
    }), 200

# Lead Management
@app.route('/api/leads', methods=['GET'])
@token_required
def get_leads(current_user_id):
    leads = Lead.query.filter_by(user_id=current_user_id).all()
    return jsonify([lead.to_dict() for lead in leads]), 200

@app.route('/api/leads', methods=['POST'])
@token_required
def create_lead(current_user_id):
    data = request.get_json()
    if not data or not data.get('name') or not data.get('email'):
        return jsonify({'message': 'Name and email are required'}), 400
    
    new_lead = Lead(
        user_id=current_user_id,
        name=data['name'],
        email=data['email'],
        phone=data.get('phone'),
        company=data.get('company'),
        status=data.get('status', 'new'),
        source=data.get('source', 'web')
    )
    
    db.session.add(new_lead)
    db.session.commit()
    
    return jsonify({
        'message': 'Lead created successfully',
        'lead': new_lead.to_dict()
    }), 201

# Add the main entry point
if __name__ == '__main__':
    app.run(debug=True)

# Voice Agent Routes
@app.route('/api/voice-agents', methods=['GET'])
@token_required
def get_voice_agents(current_user_id):
    agents = VoiceAgent.query.filter_by(user_id=current_user_id).all()
    return jsonify([agent.to_dict() for agent in agents]), 200

@app.route('/api/voice-agents', methods=['POST'])
@token_required
def create_voice_agent(current_user_id):
    data = request.get_json()
    
    new_agent = VoiceAgent(
        user_id=current_user_id,
        name=data['name'],
        description=data.get('description', ''),
        voice_id=data['voice_id'],
        language=data.get('language', 'en'),
        is_active=data.get('is_active', True),
        config=data.get('config', {})
    )
    
    db.session.add(new_agent)
    db.session.commit()
    
    return jsonify({
        'message': 'Voice agent created successfully',
        'agent': new_agent.to_dict()
    }), 201

@app.route('/api/voice-agent/call', methods=['POST'])
@token_required
def initiate_call(current_user_id):
    data = request.get_json()
    
    # Log the call
    call_log = CallLog(
        user_id=current_user_id,
        lead_id=data.get('lead_id'),
        voice_agent_id=data.get('voice_agent_id'),
        from_number=data['from_number'],
        to_number=data['to_number'],
        direction='outbound',
        status='initiated'
    )
    
    db.session.add(call_log)
    db.session.commit()
    
    # Here you would integrate with your voice service (Twilio, Plivo, etc.)
    # response = voice_service.initiate_call(
    #     to=data['to_number'],
    #     from_=data['from_number'],
    #     call_log_id=call_log.id
    # )
    
    return jsonify({
        'message': 'Call initiated',
        'call_log': call_log.to_dict()
    }), 200

# Conversation Routes
@app.route('/api/conversations', methods=['GET'])
@token_required
def get_conversations(current_user_id):
    conversations = Conversation.query.filter_by(user_id=current_user_id).all()
    return jsonify([conv.to_dict() for conv in conversations]), 200

@app.route('/api/conversations', methods=['POST'])
@token_required
def create_conversation(current_user_id):
    data = request.get_json()
    
    new_conversation = Conversation(
        user_id=current_user_id,
        lead_id=data.get('lead_id'),
        title=data.get('title', 'New Conversation'),
        channel=data.get('channel', 'chat'),
        status='active'
    )
    
    db.session.add(new_conversation)
    db.session.commit()
    
    return jsonify({
        'message': 'Conversation created successfully',
        'conversation': new_conversation.to_dict()
    }), 201

# Message Routes
@app.route('/api/conversations/<int:conversation_id>/messages', methods=['GET'])
@token_required
def get_messages(current_user_id, conversation_id):
    # Verify the conversation belongs to the user
    conversation = Conversation.query.filter_by(
        id=conversation_id,
        user_id=current_user_id
    ).first_or_404()
    
    messages = Message.query.filter_by(conversation_id=conversation_id).all()
    return jsonify([msg.to_dict() for msg in messages]), 200

@app.route('/api/conversations/<int:conversation_id>/messages', methods=['POST'])
@token_required
def send_message(current_user_id, conversation_id):
    # Verify the conversation belongs to the user
    conversation = Conversation.query.filter_by(
        id=conversation_id,
        user_id=current_user_id
    ).first_or_404()
    
    data = request.get_json()
    
    new_message = Message(
        conversation_id=conversation_id,
        sender_type='user',
        content=data['content'],
        metadata=data.get('metadata', {})
    )
    
    db.session.add(new_message)
    db.session.commit()
    
    # Here you would add logic to process the message (e.g., send to AI, save response, etc.)
    
    return jsonify({
        'message': 'Message sent successfully',
        'message_data': new_message.to_dict()
    }), 201

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Error Handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# Health Check
@app.route('/api/health')
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': datetime.utcnow().isoformat()})

# Root route (health check)
@app.route('/')
def home():
    return jsonify({
        'message': 'Welcome to vly-agentflow API',
        'status': 'running',
        'timestamp': datetime.utcnow().isoformat()
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=os.getenv('FLASK_DEBUG', 'true').lower() == 'true')
