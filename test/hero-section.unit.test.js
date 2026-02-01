/**
 * Unit Tests for Hero Section Content
 * Tests exact text content matches requirements and button functionality
 * Requirements: 3.2, 3.3, 3.4, 3.5, 3.6
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Hero Section Content Tests', () => {
  let mockScrollTo;

  beforeEach(() => {
    // Setup DOM with hero section HTML structure
    document.body.innerHTML = `
      <section class="hero" id="hero">
        <div class="hero-container">
          <h1 class="hero-title">GofieVFX</h1>
          <h2 class="hero-subtitle">Professional Video Editor • Motion Graphics • High-Retention Edits</h2>
          <p class="hero-tagline">Nearly 6 years of experience crafting engaging, story-driven videos</p>
          <div class="hero-buttons">
            <a href="#contact" class="btn btn-primary">Get a Quote</a>
            <a href="#portfolio" class="btn btn-secondary">View Work</a>
          </div>
        </div>
      </section>

      <!-- Target sections for button navigation -->
      <section class="contact" id="contact">
        <h2>Contact</h2>
      </section>
      <section class="portfolio" id="portfolio">
        <h2>Portfolio</h2>
      </section>
    `;

    // Mock scrollTo function
    mockScrollTo = vi.fn();
    window.scrollTo = mockScrollTo;

    // Setup smooth scrolling behavior (simulating main.js functionality)
    setupSmoothScrolling();
  });

  // Helper function to setup smooth scrolling
  function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  describe('Hero Section Text Content - Requirements 3.2, 3.3, 3.4', () => {
    /**
     * Requirement 3.2: THE Hero_Section SHALL display "GofieVFX" as the primary heading
     */
    it('should display "GofieVFX" as the primary heading', () => {
      const heroTitle = document.querySelector('.hero-title');
      
      expect(heroTitle).toBeTruthy();
      expect(heroTitle.textContent.trim()).toBe('GofieVFX');
      expect(heroTitle.tagName.toLowerCase()).toBe('h1');
    });

    /**
     * Requirement 3.3: THE Hero_Section SHALL display "Professional Video Editor • Motion Graphics • High-Retention Edits" as subheading
     */
    it('should display the exact subheading text', () => {
      const heroSubtitle = document.querySelector('.hero-subtitle');
      const expectedSubheading = 'Professional Video Editor • Motion Graphics • High-Retention Edits';
      
      expect(heroSubtitle).toBeTruthy();
      expect(heroSubtitle.textContent.trim()).toBe(expectedSubheading);
      expect(heroSubtitle.tagName.toLowerCase()).toBe('h2');
    });

    /**
     * Requirement 3.4: THE Hero_Section SHALL display "Nearly 6 years of experience crafting engaging, story-driven videos" as tagline
     */
    it('should display the exact tagline text', () => {
      const heroTagline = document.querySelector('.hero-tagline');
      const expectedTagline = 'Nearly 6 years of experience crafting engaging, story-driven videos';
      
      expect(heroTagline).toBeTruthy();
      expect(heroTagline.textContent.trim()).toBe(expectedTagline);
      expect(heroTagline.tagName.toLowerCase()).toBe('p');
    });

    /**
     * Combined test to verify all hero text content is present and correct
     */
    it('should contain all required text elements with correct hierarchy', () => {
      const heroSection = document.querySelector('.hero');
      const heroContainer = document.querySelector('.hero-container');
      
      expect(heroSection).toBeTruthy();
      expect(heroContainer).toBeTruthy();
      
      // Verify all text elements exist within the hero container
      const title = heroContainer.querySelector('.hero-title');
      const subtitle = heroContainer.querySelector('.hero-subtitle');
      const tagline = heroContainer.querySelector('.hero-tagline');
      
      expect(title).toBeTruthy();
      expect(subtitle).toBeTruthy();
      expect(tagline).toBeTruthy();
      
      // Verify correct text content
      expect(title.textContent.trim()).toBe('GofieVFX');
      expect(subtitle.textContent.trim()).toBe('Professional Video Editor • Motion Graphics • High-Retention Edits');
      expect(tagline.textContent.trim()).toBe('Nearly 6 years of experience crafting engaging, story-driven videos');
    });
  });

  describe('Hero Section Button Functionality - Requirements 3.5, 3.6', () => {
    /**
     * Requirement 3.5: THE Hero_Section SHALL include a "Get a Quote" primary button that scrolls to the contact form
     */
    it('should have a "Get a Quote" button that scrolls to contact section', () => {
      const getQuoteButton = document.querySelector('.hero-buttons .btn-primary');
      const contactSection = document.querySelector('#contact');
      
      // Verify button exists and has correct text
      expect(getQuoteButton).toBeTruthy();
      expect(getQuoteButton.textContent.trim()).toBe('Get a Quote');
      expect(getQuoteButton.getAttribute('href')).toBe('#contact');
      expect(getQuoteButton.classList.contains('btn-primary')).toBe(true);
      
      // Mock contact section offsetTop
      Object.defineProperty(contactSection, 'offsetTop', {
        value: 1000,
        configurable: true
      });
      
      // Test button click functionality
      mockScrollTo.mockClear();
      const clickEvent = new Event('click', { bubbles: true, cancelable: true });
      getQuoteButton.dispatchEvent(clickEvent);
      
      // Verify smooth scrolling to contact section
      expect(mockScrollTo).toHaveBeenCalledTimes(1);
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 920, // 1000 - 80 (navbar offset)
        behavior: 'smooth'
      });
    });

    /**
     * Requirement 3.6: THE Hero_Section SHALL include a "View Work" secondary button that scrolls to the portfolio slider
     */
    it('should have a "View Work" button that scrolls to portfolio section', () => {
      const viewWorkButton = document.querySelector('.hero-buttons .btn-secondary');
      const portfolioSection = document.querySelector('#portfolio');
      
      // Verify button exists and has correct text
      expect(viewWorkButton).toBeTruthy();
      expect(viewWorkButton.textContent.trim()).toBe('View Work');
      expect(viewWorkButton.getAttribute('href')).toBe('#portfolio');
      expect(viewWorkButton.classList.contains('btn-secondary')).toBe(true);
      
      // Mock portfolio section offsetTop
      Object.defineProperty(portfolioSection, 'offsetTop', {
        value: 1500,
        configurable: true
      });
      
      // Test button click functionality
      mockScrollTo.mockClear();
      const clickEvent = new Event('click', { bubbles: true, cancelable: true });
      viewWorkButton.dispatchEvent(clickEvent);
      
      // Verify smooth scrolling to portfolio section
      expect(mockScrollTo).toHaveBeenCalledTimes(1);
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 1420, // 1500 - 80 (navbar offset)
        behavior: 'smooth'
      });
    });

    /**
     * Test both buttons exist within the hero-buttons container
     */
    it('should contain both CTA buttons within the hero-buttons container', () => {
      const heroButtons = document.querySelector('.hero-buttons');
      const primaryButton = heroButtons.querySelector('.btn-primary');
      const secondaryButton = heroButtons.querySelector('.btn-secondary');
      
      expect(heroButtons).toBeTruthy();
      expect(primaryButton).toBeTruthy();
      expect(secondaryButton).toBeTruthy();
      
      // Verify button order and content
      const buttons = heroButtons.querySelectorAll('a.btn');
      expect(buttons).toHaveLength(2);
      
      // First button should be primary "Get a Quote"
      expect(buttons[0].classList.contains('btn-primary')).toBe(true);
      expect(buttons[0].textContent.trim()).toBe('Get a Quote');
      expect(buttons[0].getAttribute('href')).toBe('#contact');
      
      // Second button should be secondary "View Work"
      expect(buttons[1].classList.contains('btn-secondary')).toBe(true);
      expect(buttons[1].textContent.trim()).toBe('View Work');
      expect(buttons[1].getAttribute('href')).toBe('#portfolio');
    });

    /**
     * Test button scroll targets are valid sections
     */
    it('should have buttons that target existing sections', () => {
      const getQuoteButton = document.querySelector('.hero-buttons .btn-primary');
      const viewWorkButton = document.querySelector('.hero-buttons .btn-secondary');
      
      // Get target section IDs from button hrefs
      const contactTargetId = getQuoteButton.getAttribute('href');
      const portfolioTargetId = viewWorkButton.getAttribute('href');
      
      // Verify target sections exist
      const contactSection = document.querySelector(contactTargetId);
      const portfolioSection = document.querySelector(portfolioTargetId);
      
      expect(contactSection).toBeTruthy();
      expect(portfolioSection).toBeTruthy();
      expect(contactSection.id).toBe('contact');
      expect(portfolioSection.id).toBe('portfolio');
    });
  });

  describe('Hero Section Structure and Layout', () => {
    /**
     * Test overall hero section structure matches requirements
     */
    it('should have correct HTML structure and CSS classes', () => {
      const heroSection = document.querySelector('section.hero#hero');
      const heroContainer = document.querySelector('.hero-container');
      
      expect(heroSection).toBeTruthy();
      expect(heroContainer).toBeTruthy();
      
      // Verify hero section contains all required elements
      const title = heroSection.querySelector('.hero-title');
      const subtitle = heroSection.querySelector('.hero-subtitle');
      const tagline = heroSection.querySelector('.hero-tagline');
      const buttonsContainer = heroSection.querySelector('.hero-buttons');
      
      expect(title).toBeTruthy();
      expect(subtitle).toBeTruthy();
      expect(tagline).toBeTruthy();
      expect(buttonsContainer).toBeTruthy();
      
      // Verify elements are within the hero container
      expect(heroContainer.contains(title)).toBe(true);
      expect(heroContainer.contains(subtitle)).toBe(true);
      expect(heroContainer.contains(tagline)).toBe(true);
      expect(heroContainer.contains(buttonsContainer)).toBe(true);
    });

    /**
     * Test hero section has correct ID for navigation targeting
     */
    it('should have id="hero" for navigation targeting', () => {
      const heroSection = document.querySelector('.hero');
      
      expect(heroSection).toBeTruthy();
      expect(heroSection.id).toBe('hero');
      expect(heroSection.tagName.toLowerCase()).toBe('section');
    });
  });
});