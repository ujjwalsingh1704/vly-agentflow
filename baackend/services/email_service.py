import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from flask import jsonify, request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from email.utils import formataddr
import logging

class EmailService:
    def __init__(self, app=None):
        self.smtp_server = None
        self.smtp_port = None
        self.smtp_username = None
        self.smtp_password = None
        self.default_sender = None
        self.use_tls = True
        
        if app is not None:
            self.init_app(app)
    
    def init_app(self, app):
        """Initialize email service with configuration"""
        self.smtp_server = app.config.get('SMTP_SERVER', os.getenv('SMTP_SERVER'))
        self.smtp_port = int(app.config.get('SMTP_PORT', os.getenv('SMTP_PORT', 587)))
        self.smtp_username = app.config.get('SMTP_USERNAME', os.getenv('SMTP_USERNAME'))
        self.smtp_password = app.config.get('SMTP_PASSWORD', os.getenv('SMTP_PASSWORD'))
        self.default_sender = app.config.get('DEFAULT_EMAIL_SENDER', 
                                           os.getenv('DEFAULT_EMAIL_SENDER'))
        self.use_tls = app.config.get('SMTP_USE_TLS', 
                                     os.getenv('SMTP_USE_TLS', 'true').lower() == 'true')
        
        # Test connection on startup
        if app.config.get('TEST_EMAIL_ON_STARTUP', False):
            self.test_connection()
    
    def test_connection(self):
        """Test SMTP server connection"""
        try:
            with self._get_smtp_connection() as server:
                server.quit()
            return True
        except Exception as e:
            current_app.logger.error(f"SMTP connection test failed: {str(e)}")
            return False
    
    def _get_smtp_connection(self):
        """Create and return an SMTP connection"""
        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port, timeout=10)
            server.ehlo()
            
            if self.use_tls:
                server.starttls()
                server.ehlo()
                
            if self.smtp_username and self.smtp_password:
                server.login(self.smtp_username, self.smtp_password)
                
            return server
            
        except Exception as e:
            current_app.logger.error(f"Failed to create SMTP connection: {str(e)}")
            raise
    
    def send_email(self, to_emails, subject, body, 
                  from_email=None, cc_emails=None, bcc_emails=None, 
                  html_body=None, attachments=None, reply_to=None):
        """
        Send an email with optional HTML and attachments
        
        Args:
            to_emails (str or list): Recipient email(s)
            subject (str): Email subject
            body (str): Plain text email body
            from_email (str, optional): Sender email. Defaults to configured default.
            cc_emails (list, optional): CC recipient emails
            bcc_emails (list, optional): BCC recipient emails
            html_body (str, optional): HTML version of the email
            attachments (list, optional): List of file attachments
            reply_to (str, optional): Reply-To email address
            
        Returns:
            dict: Result of the send operation
        """
        if not self.smtp_server or not self.smtp_port:
            return {
                'success': False,
                'error': 'Email service not properly configured'
            }
            
        # Ensure emails are in list format
        to_emails = [to_emails] if isinstance(to_emails, str) else to_emails
        cc_emails = cc_emails or []
        bcc_emails = bcc_emails or []
        from_email = from_email or self.default_sender
        
        if not from_email:
            return {
                'success': False,
                'error': 'No sender email address specified'
            }
        
        # Create message container
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = from_email
        msg['To'] = ', '.join(to_emails)
        
        if cc_emails:
            msg['Cc'] = ', '.join(cc_emails)
        if reply_to:
            msg['Reply-To'] = reply_to
        
        # Attach body parts
        part1 = MIMEText(body, 'plain')
        msg.attach(part1)
        
        if html_body:
            part2 = MIMEText(html_body, 'html')
            msg.attach(part2)
        
        # Attach files
        if attachments:
            for attachment in attachments:
                if isinstance(attachment, dict) and 'filename' in attachment and 'content' in attachment:
                    part = MIMEApplication(
                        attachment['content'],
                        Name=attachment['filename']
                    )
                    part['Content-Disposition'] = f'attachment; filename="{attachment["filename"]}"'
                    msg.attach(part)
        
        # Convert to list of all recipients
        all_recipients = to_emails + cc_emails + bcc_emails
        
        try:
            with self._get_smtp_connection() as server:
                server.send_message(msg, from_addr=from_email, to_addrs=all_recipients)
                
            return {
                'success': True,
                'message': 'Email sent successfully',
                'to': to_emails,
                'cc': cc_emails,
                'bcc': bcc_emails,
                'subject': subject
            }
            
        except Exception as e:
            current_app.logger.error(f"Failed to send email: {str(e)}")
            return {
                'success': False,
                'error': f'Failed to send email: {str(e)}',
                'to': to_emails
            }

# Initialize the service instance
email_service = EmailService()

def create_email_routes(bp):
    """Create email service API routes"""
    
    @bp.route('/email/send', methods=['POST'])
    @jwt_required()
    def send_email():
        data = request.get_json()
        
        required_fields = ['to', 'subject', 'body']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'{field} is required'
                }), 400
        
        result = email_service.send_email(
            to_emails=data['to'],
            subject=data['subject'],
            body=data['body'],
            from_email=data.get('from_email'),
            cc_emails=data.get('cc', []),
            bcc_emails=data.get('bcc', []),
            html_body=data.get('html_body'),
            reply_to=data.get('reply_to')
        )
        
        return jsonify(result), 200 if result.get('success') else 500
    
    @bp.route('/email/test', methods=['POST'])
    @jwt_required()
    def test_email_config():
        """Test email configuration"""
        test_email = request.json.get('test_email')
        if not test_email:
            return jsonify({
                'success': False,
                'message': 'test_email is required'
            }), 400
            
        result = email_service.send_email(
            to_emails=test_email,
            subject="Test Email",
            body="This is a test email from the system.",
            html_body="<p>This is a <strong>test email</strong> from the system.</p>"
        )
        
        return jsonify(result), 200 if result.get('success') else 500
    
    return bp
