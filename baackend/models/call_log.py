from datetime import datetime
from . import db

class CallLog(db.Model):
    __tablename__ = 'call_logs'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    lead_id = db.Column(db.Integer, db.ForeignKey('leads.id'), nullable=True)
    voice_agent_id = db.Column(db.Integer, db.ForeignKey('voice_agents.id'), nullable=True)
    from_number = db.Column(db.String(20), nullable=False)
    to_number = db.Column(db.String(20), nullable=False)
    direction = db.Column(db.String(10), nullable=False)  # inbound, outbound
    status = db.Column(db.String(20), nullable=False)  # initiated, ringing, in-progress, completed, failed
    duration = db.Column(db.Integer, default=0)  # in seconds
    recording_url = db.Column(db.String(500), nullable=True)
    transcription = db.Column(db.Text, nullable=True)
    call_metadata = db.Column('metadata', db.JSON, nullable=True)  # Additional call metadata
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    ended_at = db.Column(db.DateTime, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'lead_id': self.lead_id,
            'voice_agent_id': self.voice_agent_id,
            'from_number': self.from_number,
            'to_number': self.to_number,
            'direction': self.direction,
            'status': self.status,
            'duration': self.duration,
            'recording_url': self.recording_url,
            'transcription': self.transcription,
            'metadata': self.call_metadata,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'ended_at': self.ended_at.isoformat() if self.ended_at else None
        }
