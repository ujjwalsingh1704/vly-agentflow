from datetime import datetime
from . import db, Base

class Message(Base, db.Model):
    __tablename__ = 'messages'
    
    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'), nullable=False)
    sender_type = db.Column(db.String(20), nullable=False)  # user, bot, lead
    content = db.Column(db.Text, nullable=False)
    message_metadata = db.Column('metadata', db.JSON, nullable=True)  # Additional metadata like sentiment, intents, etc.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'conversation_id': self.conversation_id,
            'sender_type': self.sender_type,
            'content': self.content,
            'metadata': self.message_metadata,
            'created_at': self.created_at.isoformat()
        }
