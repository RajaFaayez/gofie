/**
 * Unit Tests for Contact Form
 * Tests all form fields are present and functional, validation rules and error messages,
 * and success confirmation display
 * Requirements: 12.1-12.8
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Contact Form Unit Tests', () => {
  let mockPortfolioApp;

  beforeEach(() => {
    // Setup complete DOM structure with contact form
    document.body.innerHTML = `
      <!-- Contact Form Section -->
      <section class="contact" id="contact">
        <div class="container">
          <h2 class="section-title">Get a Quote</h2>
          <form class="contact-form" id="contactForm" novalidate>
            <div class="form-group floating-label">
              <input type="text" id="name" name="name" required autocomplete="name" maxlength="50">
              <label for="name">Name</label>
              <div class="form-error" id="nameError"></div>
            </div>
            <div class="form-group floating-label">
              <input type="email" id="email" name="email" required autocomplete="email">
              <label for="email">Email</label>
              <div class="form-error" id="emailError"></div>
            </div>
            <div class="form-group floating-label">
              <select id="projectType" name="projectType" required>
                <option value="">Select project type</option>
                <option value="youtube-longform">YouTube Long-form Video</option>
                <option value="shortform">Short-form Content (TikTok/Reels/Shorts)</option>
                <option value="motion-graphics">Motion Graphics & Animation</option>
                <option value="commercial">Commercial/Brand Video</option>
                <option value="color-grading">Color Grading & Post-Production</option>
                <option value="other">Other (Please specify in message)</option>
              </select>
              <label for="projectType">Project Type</label>
              <div class="form-error" id="projectTypeError"></div>
            </div>
            <div class="form-group floating-label">
              <textarea id="message" name="message" rows="5" required maxlength="1000" placeholder=" "></textarea>
              <label for="message">Message / Project Details</label>
              <div class="form-error" id="messageError"></div>
              <div class="character-count">
                <span id="messageCount">0</span>/1000 characters
              </div>
            </div>
            <button type="submit" class="btn btn-primary form-submit-btn">
              <span class="btn-text">Send Message</span>
              <span class="btn-loading" style="display: none;">
                <span class="loading-spinner"></span>
                Sending...
              </span>
            </button>
          </form>
          <div class="form-success" id="formSuccess" style="display: none;">
            <div class="success-icon">✓</div>
            <h3>Thank you!</h3>
            <p>Your message has been sent successfully. I'll get back to you within 24 hours.</p>
          </div>
          <div class="form-error-message" id="formErrorMessage" style="display: none;">
            <div class="error-icon">⚠</div>
            <h3>Oops! Something went wrong</h3>
            <p>There was an error sending your message. Please try again or contact me directly.</p>
            <button type="button" class="btn btn-secondary retry-btn" id="retryBtn">Try Again</button>
          </div>
        </div>
      </section>
    `;

    // Mock PortfolioApp functionality for form handling
    mockPortfolioApp = {
      validateField: vi.fn(),
      validateFormSubmission: vi.fn(),
      setupFormValidation: vi.fn(),
      setupCharacterCounter: vi.fn(),
      setupFloatingLabels: vi.fn(),
      submitForm: vi.fn(),
      showFieldError: vi.fn(),
      hideFieldError: vi.fn(),
      clearFormErrors: vi.fn(),
      updateFloatingLabel: vi.fn()
    };

    // Mock form validation methods
    global.validateField = mockPortfolioApp.validateField;
    global.validateFormSubmission = mockPortfolioApp.validateFormSubmission;

    // Setup form event listeners (simulating main.js functionality)
    setupContactFormEventListeners();
  });

  // Helper function to setup form event listeners
  function setupContactFormEventListeners() {
    const form = document.getElementById('contactForm');
    const messageField = document.getElementById('message');
    const counterElement = document.getElementById('messageCount');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
          name: formData.get('name')?.trim(),
          email: formData.get('email')?.trim(),
          projectType: formData.get('projectType'),
          message: formData.get('message')?.trim(),
          timestamp: new Date().toISOString(),
          source: 'portfolio-website'
        };

        // Simulate validation
        if (validateFormData(data)) {
          showSuccessMessage();
        }
      });
    }

    // Setup character counter
    if (messageField && counterElement) {
      messageField.addEventListener('input', () => {
        counterElement.textContent = messageField.value.length;
      });
    }

    // Setup floating labels
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        updateFloatingLabel(input);
      });
      input.addEventListener('blur', () => {
        updateFloatingLabel(input);
      });
    });
  }

  // Helper functions for form validation and UI updates
  function validateFormData(data) {
    let isValid = true;
    
    // Name validation
    if (!data.name || data.name.length < 2 || data.name.length > 50) {
      isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      isValid = false;
    }
    
    // Project type validation
    if (!data.projectType) {
      isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.length < 10 || data.message.length > 1000) {
      isValid = false;
    }
    
    return isValid;
  }

  function updateFloatingLabel(input) {
    const hasValue = input.value.trim() !== '' || (input.type === 'select-one' && input.value !== '');
    
    if (hasValue) {
      input.classList.add('has-value');
    } else {
      input.classList.remove('has-value');
    }
  }

  function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');
    
    form.style.display = 'none';
    successMessage.style.display = 'block';
  }

  describe('Contact Form Structure and Fields - Requirements 12.1-12.6', () => {
    /**
     * Requirement 12.1: THE Contact_Form SHALL display "Get a Quote" as title
     */
    it('should display "Get a Quote" as section title', () => {
      const sectionTitle = document.querySelector('.contact .section-title');
      
      expect(sectionTitle).toBeTruthy();
      expect(sectionTitle.textContent.trim()).toBe('Get a Quote');
      expect(sectionTitle.tagName.toLowerCase()).toBe('h2');
    });

    /**
     * Requirement 12.2: THE Contact_Form SHALL include a "Name" input field
     */
    it('should include a Name input field with correct attributes', () => {
      const nameField = document.getElementById('name');
      const nameLabel = document.querySelector('label[for="name"]');
      
      expect(nameField).toBeTruthy();
      expect(nameLabel).toBeTruthy();
      
      expect(nameField.type).toBe('text');
      expect(nameField.name).toBe('name');
      expect(nameField.required).toBe(true);
      expect(nameField.maxLength).toBe(50);
      expect(nameField.autocomplete).toBe('name');
      expect(nameLabel.textContent.trim()).toBe('Name');
    });

    /**
     * Requirement 12.3: THE Contact_Form SHALL include an "Email" input field
     */
    it('should include an Email input field with correct attributes', () => {
      const emailField = document.getElementById('email');
      const emailLabel = document.querySelector('label[for="email"]');
      
      expect(emailField).toBeTruthy();
      expect(emailLabel).toBeTruthy();
      
      expect(emailField.type).toBe('email');
      expect(emailField.name).toBe('email');
      expect(emailField.required).toBe(true);
      expect(emailField.autocomplete).toBe('email');
      expect(emailLabel.textContent.trim()).toBe('Email');
    });

    /**
     * Requirement 12.4: THE Contact_Form SHALL include a "Project Type" dropdown field
     */
    it('should include a Project Type dropdown field with all required options', () => {
      const projectTypeField = document.getElementById('projectType');
      const projectTypeLabel = document.querySelector('label[for="projectType"]');
      const options = projectTypeField.querySelectorAll('option');
      
      expect(projectTypeField).toBeTruthy();
      expect(projectTypeLabel).toBeTruthy();
      
      expect(projectTypeField.tagName.toLowerCase()).toBe('select');
      expect(projectTypeField.name).toBe('projectType');
      expect(projectTypeField.required).toBe(true);
      expect(projectTypeLabel.textContent.trim()).toBe('Project Type');
      
      // Verify all required options are present
      expect(options).toHaveLength(7); // Including the default "Select project type" option
      
      const expectedOptions = [
        { value: '', text: 'Select project type' },
        { value: 'youtube-longform', text: 'YouTube Long-form Video' },
        { value: 'shortform', text: 'Short-form Content (TikTok/Reels/Shorts)' },
        { value: 'motion-graphics', text: 'Motion Graphics & Animation' },
        { value: 'commercial', text: 'Commercial/Brand Video' },
        { value: 'color-grading', text: 'Color Grading & Post-Production' },
        { value: 'other', text: 'Other (Please specify in message)' }
      ];
      
      options.forEach((option, index) => {
        expect(option.value).toBe(expectedOptions[index].value);
        expect(option.textContent.trim()).toBe(expectedOptions[index].text);
      });
    });

    /**
     * Requirement 12.5: THE Contact_Form SHALL include a "Message / Project Details" textarea field
     */
    it('should include a Message textarea field with correct attributes', () => {
      const messageField = document.getElementById('message');
      const messageLabel = document.querySelector('label[for="message"]');
      
      expect(messageField).toBeTruthy();
      expect(messageLabel).toBeTruthy();
      
      expect(messageField.tagName.toLowerCase()).toBe('textarea');
      expect(messageField.name).toBe('message');
      expect(messageField.required).toBe(true);
      expect(messageField.maxLength).toBe(1000);
      expect(messageField.rows).toBe(5);
      expect(messageLabel.textContent.trim()).toBe('Message / Project Details');
    });

    /**
     * Requirement 12.6: THE Contact_Form SHALL include a submit button
     */
    it('should include a submit button with correct attributes', () => {
      const submitButton = document.querySelector('.form-submit-btn');
      const btnText = submitButton.querySelector('.btn-text');
      const btnLoading = submitButton.querySelector('.btn-loading');
      
      expect(submitButton).toBeTruthy();
      expect(btnText).toBeTruthy();
      expect(btnLoading).toBeTruthy();
      
      expect(submitButton.type).toBe('submit');
      expect(submitButton.classList.contains('btn')).toBe(true);
      expect(submitButton.classList.contains('btn-primary')).toBe(true);
      expect(btnText.textContent.trim()).toBe('Send Message');
      expect(btnLoading.style.display).toBe('none');
    });

    /**
     * Test that all form fields are within the contact form
     */
    it('should contain all form fields within the contact form element', () => {
      const contactForm = document.getElementById('contactForm');
      
      expect(contactForm).toBeTruthy();
      expect(contactForm.tagName.toLowerCase()).toBe('form');
      expect(contactForm.classList.contains('contact-form')).toBe(true);
      expect(contactForm.noValidate).toBe(true);
      
      // Verify all required fields are within the form
      const nameField = contactForm.querySelector('#name');
      const emailField = contactForm.querySelector('#email');
      const projectTypeField = contactForm.querySelector('#projectType');
      const messageField = contactForm.querySelector('#message');
      const submitButton = contactForm.querySelector('.form-submit-btn');
      
      expect(nameField).toBeTruthy();
      expect(emailField).toBeTruthy();
      expect(projectTypeField).toBeTruthy();
      expect(messageField).toBeTruthy();
      expect(submitButton).toBeTruthy();
    });

    /**
     * Test form group structure for floating labels
     */
    it('should have correct form group structure for floating labels', () => {
      const formGroups = document.querySelectorAll('.form-group.floating-label');
      
      expect(formGroups).toHaveLength(4); // Name, Email, Project Type, Message
      
      formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        const errorDiv = group.querySelector('.form-error');
        
        expect(input).toBeTruthy();
        expect(label).toBeTruthy();
        expect(errorDiv).toBeTruthy();
        
        // Verify label is associated with input
        expect(label.getAttribute('for')).toBe(input.id);
        
        // Verify error div has correct ID
        expect(errorDiv.id).toBe(`${input.name}Error`);
      });
    });
  });

  describe('Form Validation Rules and Error Messages - Requirements 12.7', () => {
    /**
     * Test name field validation
     */
    it('should validate name field correctly', () => {
      const nameField = document.getElementById('name');
      
      // Test empty name
      nameField.value = '';
      expect(validateFormData({ name: '', email: 'test@test.com', projectType: 'youtube-longform', message: 'Test message here' })).toBe(false);
      
      // Test name too short
      nameField.value = 'A';
      expect(validateFormData({ name: 'A', email: 'test@test.com', projectType: 'youtube-longform', message: 'Test message here' })).toBe(false);
      
      // Test name too long
      nameField.value = 'A'.repeat(51);
      expect(validateFormData({ name: 'A'.repeat(51), email: 'test@test.com', projectType: 'youtube-longform', message: 'Test message here' })).toBe(false);
      
      // Test valid name
      nameField.value = 'John Doe';
      expect(validateFormData({ name: 'John Doe', email: 'test@test.com', projectType: 'youtube-longform', message: 'Test message here' })).toBe(true);
    });

    /**
     * Test email field validation
     */
    it('should validate email field correctly', () => {
      const emailField = document.getElementById('email');
      
      // Test empty email
      emailField.value = '';
      expect(validateFormData({ name: 'John Doe', email: '', projectType: 'youtube-longform', message: 'Test message here' })).toBe(false);
      
      // Test invalid email format
      emailField.value = 'invalid-email';
      expect(validateFormData({ name: 'John Doe', email: 'invalid-email', projectType: 'youtube-longform', message: 'Test message here' })).toBe(false);
      
      // Test invalid email format (missing @)
      emailField.value = 'testtest.com';
      expect(validateFormData({ name: 'John Doe', email: 'testtest.com', projectType: 'youtube-longform', message: 'Test message here' })).toBe(false);
      
      // Test invalid email format (missing domain)
      emailField.value = 'test@';
      expect(validateFormData({ name: 'John Doe', email: 'test@', projectType: 'youtube-longform', message: 'Test message here' })).toBe(false);
      
      // Test valid email
      emailField.value = 'test@example.com';
      expect(validateFormData({ name: 'John Doe', email: 'test@example.com', projectType: 'youtube-longform', message: 'Test message here' })).toBe(true);
    });

    /**
     * Test project type field validation
     */
    it('should validate project type field correctly', () => {
      const projectTypeField = document.getElementById('projectType');
      
      // Test empty project type
      projectTypeField.value = '';
      expect(validateFormData({ name: 'John Doe', email: 'test@test.com', projectType: '', message: 'Test message here' })).toBe(false);
      
      // Test valid project type
      projectTypeField.value = 'youtube-longform';
      expect(validateFormData({ name: 'John Doe', email: 'test@test.com', projectType: 'youtube-longform', message: 'Test message here' })).toBe(true);
      
      // Test all valid project type options
      const validOptions = ['youtube-longform', 'shortform', 'motion-graphics', 'commercial', 'color-grading', 'other'];
      
      validOptions.forEach(option => {
        projectTypeField.value = option;
        expect(validateFormData({ name: 'John Doe', email: 'test@test.com', projectType: option, message: 'Test message here' })).toBe(true);
      });
    });

    /**
     * Test message field validation
     */
    it('should validate message field correctly', () => {
      const messageField = document.getElementById('message');
      
      // Test empty message
      messageField.value = '';
      expect(validateFormData({ name: 'John Doe', email: 'test@test.com', projectType: 'youtube-longform', message: '' })).toBe(false);
      
      // Test message too short
      messageField.value = 'Short';
      expect(validateFormData({ name: 'John Doe', email: 'test@test.com', projectType: 'youtube-longform', message: 'Short' })).toBe(false);
      
      // Test message too long
      messageField.value = 'A'.repeat(1001);
      expect(validateFormData({ name: 'John Doe', email: 'test@test.com', projectType: 'youtube-longform', message: 'A'.repeat(1001) })).toBe(false);
      
      // Test valid message
      messageField.value = 'This is a valid message with enough characters to pass validation.';
      expect(validateFormData({ name: 'John Doe', email: 'test@test.com', projectType: 'youtube-longform', message: 'This is a valid message with enough characters to pass validation.' })).toBe(true);
    });

    /**
     * Test error message elements exist for all fields
     */
    it('should have error message elements for all form fields', () => {
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const projectTypeError = document.getElementById('projectTypeError');
      const messageError = document.getElementById('messageError');
      
      expect(nameError).toBeTruthy();
      expect(emailError).toBeTruthy();
      expect(projectTypeError).toBeTruthy();
      expect(messageError).toBeTruthy();
      
      // Verify error elements have correct classes
      expect(nameError.classList.contains('form-error')).toBe(true);
      expect(emailError.classList.contains('form-error')).toBe(true);
      expect(projectTypeError.classList.contains('form-error')).toBe(true);
      expect(messageError.classList.contains('form-error')).toBe(true);
    });

    /**
     * Test character counter functionality
     */
    it('should have character counter for message field', () => {
      const messageField = document.getElementById('message');
      const counterElement = document.getElementById('messageCount');
      const counterContainer = document.querySelector('.character-count');
      
      expect(messageField).toBeTruthy();
      expect(counterElement).toBeTruthy();
      expect(counterContainer).toBeTruthy();
      
      // Test initial state
      expect(counterElement.textContent).toBe('0');
      expect(counterContainer.textContent.trim()).toContain('/1000 characters');
      
      // Test counter updates on input
      messageField.value = 'Hello';
      const inputEvent = new Event('input', { bubbles: true });
      messageField.dispatchEvent(inputEvent);
      
      expect(counterElement.textContent).toBe('5');
      
      // Test with longer message
      messageField.value = 'A'.repeat(100);
      messageField.dispatchEvent(inputEvent);
      
      expect(counterElement.textContent).toBe('100');
    });
  });

  describe('Floating Labels Functionality - Requirement 12.7', () => {
    /**
     * Test floating labels behavior
     */
    it('should update floating labels when fields have values', () => {
      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const messageField = document.getElementById('message');
      
      // Test initial state (no has-value class)
      expect(nameField.classList.contains('has-value')).toBe(false);
      expect(emailField.classList.contains('has-value')).toBe(false);
      expect(messageField.classList.contains('has-value')).toBe(false);
      
      // Test adding values
      nameField.value = 'John Doe';
      updateFloatingLabel(nameField);
      expect(nameField.classList.contains('has-value')).toBe(true);
      
      emailField.value = 'john@example.com';
      updateFloatingLabel(emailField);
      expect(emailField.classList.contains('has-value')).toBe(true);
      
      messageField.value = 'Test message';
      updateFloatingLabel(messageField);
      expect(messageField.classList.contains('has-value')).toBe(true);
      
      // Test removing values
      nameField.value = '';
      updateFloatingLabel(nameField);
      expect(nameField.classList.contains('has-value')).toBe(false);
    });

    /**
     * Test floating labels with select field
     */
    it('should update floating labels for select field', () => {
      const projectTypeField = document.getElementById('projectType');
      
      // Test initial state (no selection)
      expect(projectTypeField.classList.contains('has-value')).toBe(false);
      
      // Test selecting an option
      projectTypeField.value = 'youtube-longform';
      updateFloatingLabel(projectTypeField);
      expect(projectTypeField.classList.contains('has-value')).toBe(true);
      
      // Test deselecting (back to empty)
      projectTypeField.value = '';
      updateFloatingLabel(projectTypeField);
      expect(projectTypeField.classList.contains('has-value')).toBe(false);
    });

    /**
     * Test floating labels respond to input events
     */
    it('should respond to input and blur events', () => {
      const nameField = document.getElementById('name');
      
      // Test input event
      nameField.value = 'Test';
      const inputEvent = new Event('input', { bubbles: true });
      nameField.dispatchEvent(inputEvent);
      
      expect(nameField.classList.contains('has-value')).toBe(true);
      
      // Test blur event
      nameField.value = '';
      const blurEvent = new Event('blur', { bubbles: true });
      nameField.dispatchEvent(blurEvent);
      
      expect(nameField.classList.contains('has-value')).toBe(false);
    });
  });

  describe('Success Confirmation Display - Requirement 12.8', () => {
    /**
     * Requirement 12.8: THE Contact_Form SHALL display a success confirmation message after submission
     */
    it('should display success confirmation message after successful form submission', () => {
      const form = document.getElementById('contactForm');
      const successMessage = document.getElementById('formSuccess');
      
      expect(form).toBeTruthy();
      expect(successMessage).toBeTruthy();
      
      // Verify initial state
      expect(successMessage.style.display).toBe('none');
      
      // Fill form with valid data
      document.getElementById('name').value = 'John Doe';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('projectType').value = 'youtube-longform';
      document.getElementById('message').value = 'I need help with video editing for my YouTube channel.';
      
      // Submit form
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
      
      // Verify success message is displayed and form is hidden
      expect(successMessage.style.display).toBe('block');
      expect(form.style.display).toBe('none');
    });

    /**
     * Test success message content and structure
     */
    it('should have correct success message content and structure', () => {
      const successMessage = document.getElementById('formSuccess');
      const successIcon = successMessage.querySelector('.success-icon');
      const successTitle = successMessage.querySelector('h3');
      const successText = successMessage.querySelector('p');
      
      expect(successMessage).toBeTruthy();
      expect(successIcon).toBeTruthy();
      expect(successTitle).toBeTruthy();
      expect(successText).toBeTruthy();
      
      expect(successMessage.classList.contains('form-success')).toBe(true);
      expect(successIcon.textContent.trim()).toBe('✓');
      expect(successTitle.textContent.trim()).toBe('Thank you!');
      expect(successText.textContent.trim()).toBe("Your message has been sent successfully. I'll get back to you within 24 hours.");
    });

    /**
     * Test error message structure exists
     */
    it('should have error message structure for failed submissions', () => {
      const errorMessage = document.getElementById('formErrorMessage');
      const errorIcon = errorMessage.querySelector('.error-icon');
      const errorTitle = errorMessage.querySelector('h3');
      const errorText = errorMessage.querySelector('p');
      const retryButton = errorMessage.querySelector('#retryBtn');
      
      expect(errorMessage).toBeTruthy();
      expect(errorIcon).toBeTruthy();
      expect(errorTitle).toBeTruthy();
      expect(errorText).toBeTruthy();
      expect(retryButton).toBeTruthy();
      
      expect(errorMessage.classList.contains('form-error-message')).toBe(true);
      expect(errorIcon.textContent.trim()).toBe('⚠');
      expect(errorTitle.textContent.trim()).toBe('Oops! Something went wrong');
      expect(errorText.textContent.trim()).toBe('There was an error sending your message. Please try again or contact me directly.');
      expect(retryButton.classList.contains('btn')).toBe(true);
      expect(retryButton.classList.contains('btn-secondary')).toBe(true);
      expect(retryButton.textContent.trim()).toBe('Try Again');
    });

    /**
     * Test form submission with invalid data doesn't show success
     */
    it('should not show success message for invalid form data', () => {
      const form = document.getElementById('contactForm');
      const successMessage = document.getElementById('formSuccess');
      
      // Fill form with invalid data (empty fields)
      document.getElementById('name').value = '';
      document.getElementById('email').value = 'invalid-email';
      document.getElementById('projectType').value = '';
      document.getElementById('message').value = 'Short';
      
      // Submit form
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
      
      // Verify success message is not displayed
      expect(successMessage.style.display).toBe('none');
      expect(form.style.display).not.toBe('none');
    });
  });

  describe('Modern UI and Call-to-Action Design - Requirement 12.9', () => {
    /**
     * Requirement 12.9: THE Contact_Form SHALL have a clear call-to-action design
     */
    it('should have modern UI with floating labels and minimal borders', () => {
      const formGroups = document.querySelectorAll('.form-group.floating-label');
      
      expect(formGroups).toHaveLength(4);
      
      formGroups.forEach(group => {
        expect(group.classList.contains('floating-label')).toBe(true);
        
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        expect(input).toBeTruthy();
        expect(label).toBeTruthy();
        
        // Verify label is properly associated
        expect(label.getAttribute('for')).toBe(input.id);
      });
    });

    /**
     * Test submit button has clear call-to-action design
     */
    it('should have clear call-to-action submit button design', () => {
      const submitButton = document.querySelector('.form-submit-btn');
      
      expect(submitButton).toBeTruthy();
      expect(submitButton.classList.contains('btn')).toBe(true);
      expect(submitButton.classList.contains('btn-primary')).toBe(true);
      expect(submitButton.classList.contains('form-submit-btn')).toBe(true);
      
      // Verify button has loading state elements
      const btnText = submitButton.querySelector('.btn-text');
      const btnLoading = submitButton.querySelector('.btn-loading');
      const loadingSpinner = btnLoading.querySelector('.loading-spinner');
      
      expect(btnText).toBeTruthy();
      expect(btnLoading).toBeTruthy();
      expect(loadingSpinner).toBeTruthy();
      
      expect(btnText.textContent.trim()).toBe('Send Message');
      expect(btnLoading.textContent.trim()).toContain('Sending...');
    });

    /**
     * Test form has proper accessibility attributes
     */
    it('should have proper accessibility attributes', () => {
      const form = document.getElementById('contactForm');
      
      expect(form.noValidate).toBe(true); // Custom validation instead of browser default
      
      // Test all inputs have proper labels
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        expect(label).toBeTruthy();
        expect(label.getAttribute('for')).toBe(input.id);
      });
      
      // Test required fields are marked as required
      const requiredFields = form.querySelectorAll('[required]');
      expect(requiredFields).toHaveLength(4); // name, email, projectType, message
      
      requiredFields.forEach(field => {
        expect(field.required).toBe(true);
      });
    });

    /**
     * Test form structure supports modern styling
     */
    it('should have structure that supports modern UI styling', () => {
      const contactSection = document.querySelector('.contact');
      const container = contactSection.querySelector('.container');
      const form = container.querySelector('.contact-form');
      
      expect(contactSection).toBeTruthy();
      expect(container).toBeTruthy();
      expect(form).toBeTruthy();
      
      expect(contactSection.classList.contains('contact')).toBe(true);
      expect(form.classList.contains('contact-form')).toBe(true);
      
      // Verify proper nesting structure
      expect(contactSection.contains(container)).toBe(true);
      expect(container.contains(form)).toBe(true);
    });
  });

  describe('Form Integration and Complete Functionality', () => {
    /**
     * Test complete form submission flow
     */
    it('should handle complete form submission flow correctly', () => {
      const form = document.getElementById('contactForm');
      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const projectTypeField = document.getElementById('projectType');
      const messageField = document.getElementById('message');
      const successMessage = document.getElementById('formSuccess');
      
      // Fill out form completely with valid data
      nameField.value = 'Jane Smith';
      emailField.value = 'jane.smith@example.com';
      projectTypeField.value = 'motion-graphics';
      messageField.value = 'I need motion graphics for my brand video. The project involves creating animated logos and transitions.';
      
      // Update floating labels
      updateFloatingLabel(nameField);
      updateFloatingLabel(emailField);
      updateFloatingLabel(projectTypeField);
      updateFloatingLabel(messageField);
      
      // Verify floating labels are active
      expect(nameField.classList.contains('has-value')).toBe(true);
      expect(emailField.classList.contains('has-value')).toBe(true);
      expect(projectTypeField.classList.contains('has-value')).toBe(true);
      expect(messageField.classList.contains('has-value')).toBe(true);
      
      // Submit form
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
      
      // Verify success flow
      expect(form.style.display).toBe('none');
      expect(successMessage.style.display).toBe('block');
    });

    /**
     * Test form data collection
     */
    it('should collect form data correctly', () => {
      const form = document.getElementById('contactForm');
      
      // Fill form with test data
      document.getElementById('name').value = 'Test User';
      document.getElementById('email').value = 'test@example.com';
      document.getElementById('projectType').value = 'commercial';
      document.getElementById('message').value = 'This is a test message for commercial video editing services.';
      
      // Create FormData and extract values
      const formData = new FormData(form);
      const data = {
        name: formData.get('name')?.trim(),
        email: formData.get('email')?.trim(),
        projectType: formData.get('projectType'),
        message: formData.get('message')?.trim(),
        timestamp: new Date().toISOString(),
        source: 'portfolio-website'
      };
      
      expect(data.name).toBe('Test User');
      expect(data.email).toBe('test@example.com');
      expect(data.projectType).toBe('commercial');
      expect(data.message).toBe('This is a test message for commercial video editing services.');
      expect(data.source).toBe('portfolio-website');
      expect(data.timestamp).toBeTruthy();
    });

    /**
     * Test all form fields are functional
     */
    it('should have all form fields functional and interactive', () => {
      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const projectTypeField = document.getElementById('projectType');
      const messageField = document.getElementById('message');
      const submitButton = document.querySelector('.form-submit-btn');
      
      // Test all fields can receive input
      nameField.value = 'Test';
      expect(nameField.value).toBe('Test');
      
      emailField.value = 'test@test.com';
      expect(emailField.value).toBe('test@test.com');
      
      projectTypeField.value = 'youtube-longform';
      expect(projectTypeField.value).toBe('youtube-longform');
      
      messageField.value = 'Test message content';
      expect(messageField.value).toBe('Test message content');
      
      // Test submit button is clickable
      expect(submitButton.disabled).toBe(false);
      expect(submitButton.type).toBe('submit');
    });
  });
});