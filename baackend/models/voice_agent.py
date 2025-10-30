from datetime import datetime
from . import db

class VoiceAgent(db.Model):
    __tablename__ = 'voice_agents'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    voice_id = db.Column(db.String(50), nullable=False)  # Reference to voice service ID
    language = db.Column(db.String(10), default='en')
    is_active = db.Column(db.Boolean, default=True)
    config = db.Column(db.JSON, nullable=True)  # Agent configuration
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    calls = db.relationship('CallLog', backref='voice_agent', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'voice_id': self.voice_id,
            'language': self.language,
            'is_active': self.is_active,
            'config': self.config,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
