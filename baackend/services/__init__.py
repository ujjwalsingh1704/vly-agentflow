"""
Services Package

This package contains various backend services for the application,
including AI, email, memory, and workflow automation services.
"""

# Import service instances
from .n8n_service import N8NService
from .openai_service import OpenAIService, openai_service
from .email_service import EmailService, email_service
from .memory_service import MemoryService, memory_service

# Initialize service instances
n8n_service = N8NService()
openai_service = OpenAIService()
email_service = EmailService()
memory_service = MemoryService()

def init_services(app):
    """Initialize all services with the Flask app"""
    # Initialize each service with the app
    n8n_service.init_app(app)
    openai_service.init_app(app)
    email_service.init_app(app)
    memory_service.init_app(app)
