/**
 * EmailJS Configuration
 * 
 * To set up email functionality:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create a new service (Gmail, Outlook, etc.)
 * 3. Create an email template
 * 4. Get your credentials and replace the values below
 */

const EMAIL_CONFIG = {
  // Replace these with your actual EmailJS credentials from your dashboard
  SERVICE_ID: 'service_123',     // e.g., 'service_abc123'
  TEMPLATE_ID: 'template_9mksqdr',   // e.g., 'template_xyz789'  
  PUBLIC_KEY: 'w3Ghs7WBPphlC_NRu',     // e.g., 'user_abcdef123456'
  
  // Email template parameters mapping
  TEMPLATE_PARAMS: {
    to_email: 'Gofievfx@gmail.com',
    reply_to: '{{from_email}}',
    from_name: '{{from_name}}',
    from_email: '{{from_email}}',
    project_type: '{{project_type}}',
    message: '{{message}}',
    timestamp: '{{timestamp}}',
    source: '{{source}}'
  }
};

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EMAIL_CONFIG;
} else {
  window.EMAIL_CONFIG = EMAIL_CONFIG;
}