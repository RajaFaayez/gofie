# EmailJS Setup Guide

This guide will help you set up EmailJS to send form submissions to Gofievfx@gmail.com.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (recommended for Gofievfx@gmail.com)
4. Follow the setup instructions to connect your Gmail account
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

### Template Subject:
```
New Quote Request from {{from_name}}
```

### Template Body:
```
New Quote Request Received

Contact Information:
Name: {{from_name}}
Email: {{from_email}}
Project Type: {{project_type}}

Project Details:
{{message}}

Additional Information:
Submitted: {{timestamp}}
Source: {{source}}

---
This message was sent from the GofieVFX portfolio website.
```

4. Set the **To Email** to: `Gofievfx@gmail.com`
5. Set the **Reply To** to: `{{from_email}}`
6. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_abcdef123456`)

## Step 5: Update Configuration

1. Open `js/email-config.js`
2. Replace the placeholder values:

```javascript
const EMAIL_CONFIG = {
  SERVICE_ID: 'service_abc123',      // Your actual service ID
  TEMPLATE_ID: 'template_xyz789',    // Your actual template ID  
  PUBLIC_KEY: 'user_abcdef123456',   // Your actual public key
  
  // ... rest of the config stays the same
};
```

## Step 6: Test the Form

1. Open your website
2. Fill out the contact form
3. Submit it
4. Check Gofievfx@gmail.com for the email
5. Check browser console for any errors

## Troubleshooting

### Common Issues:

1. **"EmailJS not configured" warning**: Update the credentials in `js/email-config.js`

2. **Email not received**: 
   - Check spam folder
   - Verify Gmail service is properly connected
   - Check EmailJS dashboard for delivery status

3. **CORS errors**: 
   - Make sure you're testing on a web server (not file://)
   - Use Live Server extension in VS Code or similar

4. **Template errors**: 
   - Verify all template variables match the ones in the code
   - Check template syntax in EmailJS dashboard

### EmailJS Free Tier Limits:
- 200 emails per month
- EmailJS branding in emails
- Basic support

For higher volume, consider upgrading to a paid plan.

## Security Notes

- EmailJS credentials are safe to use in client-side code
- The Public Key is meant to be public
- Service and Template IDs are not sensitive
- No server-side code required

## Alternative Solutions

If you prefer other solutions:

1. **Formspree**: Simple form handling service
2. **Netlify Forms**: If hosting on Netlify
3. **Custom backend**: Node.js, PHP, Python, etc.
4. **Google Forms**: Embed a Google Form

The current implementation with EmailJS is recommended for its simplicity and reliability.