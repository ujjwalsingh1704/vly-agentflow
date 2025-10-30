from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Conversation, Message, User
from datetime import datetime

conversation_bp = Blueprint('conversations', __name__)

@conversation_bp.route('', methods=['GET'])
@jwt_required()
def get_conversations():
    user_id = get_jwt_identity()
    conversations = Conversation.query.filter_by(user_id=user_id).order_by(Conversation.updated_at.desc()).all()
    return jsonify([conv.to_dict() for conv in conversations]), 200

@conversation_bp.route('', methods=['POST'])
@jwt_required()
def create_conversation():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    conversation = Conversation(
        user_id=user_id,
        lead_id=data.get('lead_id'),
        title=data.get('title', 'New Conversation'),
        channel=data.get('channel', 'chat'),
        status='active'
    )
    
    db.session.add(conversation)
    db.session.commit()
    
    return jsonify(conversation.to_dict()), 201

@conversation_bp.route('/<int:conversation_id>', methods=['GET'])
@jwt_required()
def get_conversation(conversation_id):
    user_id = get_jwt_identity()
    conversation = Conversation.query.filter_by(id=conversation_id, user_id=user_id).first_or_404()
    return jsonify(conversation.to_dict())

@conversation_bp.route('/<int:conversation_id>', methods=['PUT'])
@jwt_required()
def update_conversation(conversation_id):
    user_id = get_jwt_identity()
    conversation = Conversation.query.filter_by(id=conversation_id, user_id=user_id).first_or_404()
    
    data = request.get_json()
    if 'status' in data:
        conversation.status = data['status']
    if 'title' in data:
        conversation.title = data['title']
    
    db.session.commit()
    return jsonify(conversation.to_dict())

@conversation_bp.route('/<int:conversation_id>/messages', methods=['GET'])
@jwt_required()
def get_messages(conversation_id):
    user_id = get_jwt_identity()
    conversation = Conversation.query.filter_by(id=conversation_id, user_id=user_id).first_or_404()
    
    messages = Message.query.filter_by(conversation_id=conversation_id)\
                          .order_by(Message.created_at.asc())\
                          .all()
    
    return jsonify([msg.to_dict() for msg in messages])

@conversation_bp.route('/<int:conversation_id>/messages', methods=['POST'])
@jwt_required()
def send_message(conversation_id):
    user_id = get_jwt_identity()
    conversation = Conversation.query.filter_by(id=conversation_id, user_id=user_id).first_or_404()
    
    data = request.get_json()
    if not data or 'content' not in data:
        return jsonify({'message': 'Message content is required'}), 400
    
    message = Message(
        conversation_id=conversation_id,
        sender_type='user',
        content=data['content'],
        status='delivered'
    )
    
    db.session.add(message)
    conversation.updated_at = datetime.utcnow()
    db.session.commit()
    
    # Here you would typically process the message with your AI/agent
    # and generate a response
    
    return jsonify(message.to_dict()), 201
