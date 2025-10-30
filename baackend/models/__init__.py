from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy
db = SQLAlchemy()

def init_db(app):
    """Initialize the database with the Flask app."""
    # Import models inside the function to avoid circular imports
    from .user import User
    from .lead import Lead
    from .conversation import Conversation
    from .message import Message
    from .voice_agent import VoiceAgent
    from .call_log import CallLog
    
    # Initialize the database with the app
    db.init_app(app)
    
    with app.app_context():
        # Create all database tables
        db.create_all()
    
    return db

# Export models
from .user import User
from .lead import Lead
from .conversation import Conversation
from .message import Message
from .voice_agent import VoiceAgent
from .call_log import CallLog
