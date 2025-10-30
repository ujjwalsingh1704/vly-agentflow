from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, VoiceAgent, CallLog
from datetime import datetime

voice_agent_bp = Blueprint('voice_agents', __name__)

@voice_agent_bp.route('', methods=['GET'])
@jwt_required()
def get_voice_agents():
    user_id = get_jwt_identity()
    agents = VoiceAgent.query.filter_by(user_id=user_id).all()
    return jsonify([agent.to_dict() for agent in agents]), 200

@voice_agent_bp.route('', methods=['POST'])
@jwt_required()
def create_voice_agent():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Validate required fields
    if not data or 'name' not in data:
        return jsonify({'message': 'Name is required'}), 400
    
    # Create new voice agent
    agent = VoiceAgent(
        user_id=user_id,
        name=data['name'],
        description=data.get('description', ''),
        voice_type=data.get('voice_type', 'standard'),
        language=data.get('language', 'en-US'),
        is_active=data.get('is_active', True),
        config=data.get('config', {})
    )
    
    db.session.add(agent)
    db.session.commit()
    
    return jsonify(agent.to_dict()), 201

@voice_agent_bp.route('/<int:agent_id>', methods=['GET'])
@jwt_required()
def get_voice_agent(agent_id):
    user_id = get_jwt_identity()
    agent = VoiceAgent.query.filter_by(id=agent_id, user_id=user_id).first_or_404()
    return jsonify(agent.to_dict())

@voice_agent_bp.route('/<int:agent_id>', methods=['PUT'])
@jwt_required()
def update_voice_agent(agent_id):
    user_id = get_jwt_identity()
    agent = VoiceAgent.query.filter_by(id=agent_id, user_id=user_id).first_or_404()
    
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400
    
    # Update fields if they exist in the request
    update_fields = ['name', 'description', 'voice_type', 'language', 'is_active', 'config']
    for field in update_fields:
        if field in data:
            setattr(agent, field, data[field])
    
    agent.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(agent.to_dict())

@voice_agent_bp.route('/<int:agent_id>/calls', methods=['POST'])
@jwt_required()
def initiate_call(agent_id):
    user_id = get_jwt_identity()
    agent = VoiceAgent.query.filter_by(id=agent_id, user_id=user_id).first_or_404()
    
    data = request.get_json()
    if not data or 'phone_number' not in data:
        return jsonify({'message': 'Phone number is required'}), 400
    
    # Create call log
    call = CallLog(
        user_id=user_id,
        agent_id=agent_id,
        phone_number=data['phone_number'],
        status='initiated',
        direction='outbound'
    )
    
    db.session.add(call)
    db.session.commit()
    
    # Here you would typically integrate with a telephony service
    # to place the actual call
    
    return jsonify(call.to_dict()), 201

@voice_agent_bp.route('/calls/<int:call_id>', methods=['GET'])
@jwt_required()
def get_call(call_id):
    user_id = get_jwt_identity()
    call = CallLog.query.filter_by(id=call_id, user_id=user_id).first_or_404()
    return jsonify(call.to_dict())

@voice_agent_bp.route('/calls', methods=['GET'])
@jwt_required()
def get_calls():
    user_id = get_jwt_identity()
    calls = CallLog.query.filter_by(user_id=user_id).order_by(CallLog.created_at.desc()).all()
    return jsonify([call.to_dict() for call in calls]), 200
