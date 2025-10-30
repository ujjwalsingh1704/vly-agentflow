from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Lead, User
from datetime import datetime

leads_bp = Blueprint('leads', __name__)

@leads_bp.route('', methods=['GET'])
@jwt_required()
def get_leads():
    user_id = get_jwt_identity()
    leads = Lead.query.filter_by(user_id=user_id).order_by(Lead.updated_at.desc()).all()
    return jsonify([lead.to_dict() for lead in leads]), 200

@leads_bp.route('', methods=['POST'])
@jwt_required()
def create_lead():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Validate required fields
    if not data or 'name' not in data:
        return jsonify({'message': 'Name is required'}), 400
    
    # Check for duplicate email if provided
    if 'email' in data and data['email']:
        existing_lead = Lead.query.filter_by(email=data['email'], user_id=user_id).first()
        if existing_lead:
            return jsonify({'message': 'A lead with this email already exists'}), 400
    
    # Create new lead
    lead = Lead(
        user_id=user_id,
        name=data['name'],
        email=data.get('email'),
        phone=data.get('phone'),
        company=data.get('company'),
        status=data.get('status', 'new'),
        source=data.get('source', 'web'),
        score=data.get('score', 0),
        notes=data.get('notes')
    )
    
    db.session.add(lead)
    db.session.commit()
    
    return jsonify(lead.to_dict()), 201

@leads_bp.route('/<int:lead_id>', methods=['GET'])
@jwt_required()
def get_lead(lead_id):
    user_id = get_jwt_identity()
    lead = Lead.query.filter_by(id=lead_id, user_id=user_id).first_or_404()
    return jsonify(lead.to_dict())

@leads_bp.route('/<int:lead_id>', methods=['PUT'])
@jwt_required()
def update_lead(lead_id):
    user_id = get_jwt_identity()
    lead = Lead.query.filter_by(id=lead_id, user_id=user_id).first_or_404()
    
    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400
    
    # Update fields if they exist in the request
    update_fields = ['name', 'email', 'phone', 'company', 'status', 'source', 'score', 'notes']
    for field in update_fields:
        if field in data:
            setattr(lead, field, data[field])
    
    lead.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(lead.to_dict())

@leads_bp.route('/<int:lead_id>', methods=['DELETE'])
@jwt_required()
def delete_lead(lead_id):
    user_id = get_jwt_identity()
    lead = Lead.query.filter_by(id=lead_id, user_id=user_id).first_or_404()
    
    db.session.delete(lead)
    db.session.commit()
    
    return jsonify({'message': 'Lead deleted successfully'}), 200
