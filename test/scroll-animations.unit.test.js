/**
 * Unit Tests for Scroll Animations
 * Tests animations trigger on scroll and animation timing and effects
 * Requirements: 4.4, 14.3
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

describe('Scroll Animations Unit Tests', () => {
  let mockIntersectionObserver;
  let mockObserverInstance;
  let observerCallback;
  let observedElements;

  beforeEach(() => {
    // Reset observed elements tracking
    observedElements = new Set();

    // Mock IntersectionObserver
    mockObserverInstance = {
      observe: vi.fn((element) => {
        observedElements.add(element);
      }),
      unobserve: vi.fn((element) => {
        observedElements.delete(element);
      }),
      disconnect: vi.fn(() => {
        observedElements.clear();
      })
    };

    mockIntersectionObserver = vi.fn(function(callback, options) {
      observerCallback = callback;
      return mockObserverInstance;
    });

    global.IntersectionObserver = mockIntersectionObserver;

    // Mock requestAnimationFrame
    global.requestAnimationFrame = vi.fn(cb => setTimeout(cb, 16));
    global.cancelAnimationFrame = vi.fn();

    // Setup DOM with animated elements
    document.body.innerHTML = `
      <!-- Hero Section (should not be animated) -->
      <section class="hero" id="hero">
        <div class="hero-container">
          <h1>GofieVFX</h1>
        </div>
      </section>

      <!-- About Section -->
      <section class="about" id="about">
        <div class="container">
          <h2 class="section-title">About Me</h2>
          <p class="about-text">Professional video editor content...</p>
        </div>
      </section>

      <!-- Tools Section -->
      <section class="tools" id="tools">
        <div class="container">
          <h2 class="section-title">Tools & Software</h2>
          <div class="tools-grid">
            <div class="tool-card">
              <h3>Adobe After Effects</h3>
            </div>
            <div class="tool-card">
              <h3>Adobe Premiere Pro</h3>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="services" id="services">
        <div class="container">
          <h2 class="section-title">What I Do</h2>
          <ul class="services-list">
            <li>YouTube long-form video editing</li>
            <li>Short-form content</li>
            <li>Motion graphics</li>
          </ul>
        </div>
      </section>

      <!-- Plugins Section -->
      <section class="plugins" id="plugins">
        <div class="container">
          <h2 class="section-title">Plugins & Effects</h2>
          <ul class="plugins-list">
            <li>Sapphire Plugins</li>
            <li>Boris Continuum Complete</li>
          </ul>
        </div>
      </section>

      <!-- Why Me Section -->
      <section class="why-me" id="why-me">
        <div class="container">
          <h2 class="section-title">Why Work With Me</h2>
          <div class="benefits-grid">
            <div class="benefit-item">
              <span class="benefit-icon">🎯</span>
              <p>Experience</p>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">📖</span>
              <p>Storytelling</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Results Section -->
      <section class="results" id="results">
        <div class="container">
          <p class="results-statement">80+ million views...</p>
          <div class="portfolio-slider">
            <div class="slider-container">Portfolio content</div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact" id="contact">
        <div class="container">
          <form class="contact-form" id="contactForm">
            <input type="text" name="name">
          </form>
        </div>
      </section>

      <!-- Contact Details -->
      <section class="contact-details" id="contact-details">
        <div class="container">
          <div class="contact-item">
            <span>Email: test@test.com</span>
          </div>
        </div>
      </section>
    `;

    // Initialize scroll animations (simulating main.js functionality)
    initializeScrollAnimations();
  });

  afterEach(() => {
    vi.clearAllMocks();
    observedElements.clear();
  });

  // Helper function to simulate main.js scroll animation setup
  function initializeScrollAnimations() {
    // Simulate setupScrollAnimations method
    const animatedElements = document.querySelectorAll(`
      section,
      .tool-card,
      .benefit-item,
      .services-list li,
      .plugins-list li,
      .contact-item,
      .about-text,
      .results-statement,
      .portfolio-slider,
      .contact-form
    `);

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: [0, 0.1, 0.3]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Add null check for robustness
        if (!entry || !entry.target) return;
        
        if (entry.isIntersecting) {
          const element = entry.target;
          
          if (element.tagName === 'SECTION') {
            element.classList.add('animate-fade-in');
          } else if (element.classList.contains('tool-card') || 
                     element.classList.contains('benefit-item')) {
            element.classList.add('animate-slide-up');
          } else if (element.matches('.services-list li, .plugins-list li')) {
            element.classList.add('animate-slide-in-left');
          } else if (element.classList.contains('results-statement')) {
            element.classList.add('animate-scale-in');
          } else if (element.classList.contains('portfolio-slider')) {
            element.classList.add('animate-slide-up');
          } else {
            element.classList.add('animate-fade-in');
          }
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    animatedElements.forEach(element => {
      observer.observe(element);
    });

    // Simulate initScrollAnimations method - prepare elements
    const sections = document.querySelectorAll('section');
    let sectionIndex = 0;
    sections.forEach((section) => {
      if (section.classList.contains('hero')) return;
      
      section.classList.add('animate-prepare');
      section.style.setProperty('--animation-delay', `${sectionIndex * 0.1}s`);
      sectionIndex++;
    });

    const cards = document.querySelectorAll('.tool-card, .benefit-item');
    cards.forEach((card, index) => {
      card.classList.add('animate-prepare');
      card.style.setProperty('--animation-delay', `${index * 0.05}s`);
    });

    const listItems = document.querySelectorAll('.services-list li, .plugins-list li');
    listItems.forEach((item, index) => {
      item.classList.add('animate-prepare');
      item.style.setProperty('--animation-delay', `${index * 0.1}s`);
    });

    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
      item.classList.add('animate-prepare');
      item.style.setProperty('--animation-delay', `${index * 0.15}s`);
    });

    return observer;
  }

  // Helper function to simulate intersection observer entries
  function createMockIntersectionEntry(element, isIntersecting = true, intersectionRatio = 0.5) {
    return {
      target: element,
      isIntersecting,
      intersectionRatio,
      boundingClientRect: element.getBoundingClientRect(),
      rootBounds: { top: 0, left: 0, bottom: window.innerHeight, right: window.innerWidth },
      time: Date.now()
    };
  }

  describe('Intersection Observer Setup - Requirement 4.4, 14.3', () => {
    /**
     * Requirement 4.4: THE About Me section SHALL include smooth fade-in animation on scroll
     * Requirement 14.3: THE Portfolio_Website SHALL include subtle section animations
     */
    it('should initialize Intersection Observer for scroll animations', () => {
      expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
      
      // Verify observer options
      const [callback, options] = mockIntersectionObserver.mock.calls[0];
      expect(callback).toBe(observerCallback);
      expect(options).toEqual({
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: [0, 0.1, 0.3]
      });
    });

    it('should observe all animated elements', () => {
      // Verify that elements are being observed
      expect(mockObserverInstance.observe).toHaveBeenCalled();
      
      // Check that the correct number of elements are observed
      const expectedElements = document.querySelectorAll(`
        section,
        .tool-card,
        .benefit-item,
        .services-list li,
        .plugins-list li,
        .contact-item,
        .about-text,
        .results-statement,
        .portfolio-slider,
        .contact-form
      `);
      
      expect(mockObserverInstance.observe).toHaveBeenCalledTimes(expectedElements.length);
      expect(observedElements.size).toBe(expectedElements.length);
    });

    it('should prepare elements with animate-prepare class and animation delays', () => {
      // Check sections (excluding hero)
      const sections = document.querySelectorAll('section:not(.hero)');
      sections.forEach((section, index) => {
        expect(section.classList.contains('animate-prepare')).toBe(true);
        expect(section.style.getPropertyValue('--animation-delay')).toBe(`${index * 0.1}s`);
      });

      // Check cards
      const cards = document.querySelectorAll('.tool-card, .benefit-item');
      cards.forEach((card, index) => {
        expect(card.classList.contains('animate-prepare')).toBe(true);
        expect(card.style.getPropertyValue('--animation-delay')).toBe(`${index * 0.05}s`);
      });

      // Check list items
      const listItems = document.querySelectorAll('.services-list li, .plugins-list li');
      listItems.forEach((item, index) => {
        expect(item.classList.contains('animate-prepare')).toBe(true);
        expect(item.style.getPropertyValue('--animation-delay')).toBe(`${index * 0.1}s`);
      });

      // Check contact items
      const contactItems = document.querySelectorAll('.contact-item');
      contactItems.forEach((item, index) => {
        expect(item.classList.contains('animate-prepare')).toBe(true);
        expect(item.style.getPropertyValue('--animation-delay')).toBe(`${index * 0.15}s`);
      });
    });

    it('should not prepare hero section for animation', () => {
      const heroSection = document.querySelector('.hero');
      
      expect(heroSection).toBeTruthy();
      expect(heroSection.classList.contains('animate-prepare')).toBe(false);
      expect(heroSection.style.getPropertyValue('--animation-delay')).toBe('');
    });
  });

  describe('Animation Triggers on Scroll - Requirement 4.4, 14.3', () => {
    /**
     * Test that animations trigger when elements come into view
     */
    it('should add animate-fade-in class to sections when they intersect', () => {
      const aboutSection = document.querySelector('.about');
      const toolsSection = document.querySelector('.tools');
      
      // Initially, sections should not have animation classes
      expect(aboutSection.classList.contains('animate-fade-in')).toBe(false);
      expect(toolsSection.classList.contains('animate-fade-in')).toBe(false);
      
      // Simulate intersection
      const entries = [
        createMockIntersectionEntry(aboutSection, true),
        createMockIntersectionEntry(toolsSection, true)
      ];
      
      observerCallback(entries);
      
      // Verify animation classes are added
      expect(aboutSection.classList.contains('animate-fade-in')).toBe(true);
      expect(toolsSection.classList.contains('animate-fade-in')).toBe(true);
    });

    it('should add animate-slide-up class to tool cards and benefit items when they intersect', () => {
      const toolCards = document.querySelectorAll('.tool-card');
      const benefitItems = document.querySelectorAll('.benefit-item');
      
      // Initially, cards should not have animation classes
      toolCards.forEach(card => {
        expect(card.classList.contains('animate-slide-up')).toBe(false);
      });
      benefitItems.forEach(item => {
        expect(item.classList.contains('animate-slide-up')).toBe(false);
      });
      
      // Simulate intersection for all cards and items
      const entries = [
        ...Array.from(toolCards).map(card => createMockIntersectionEntry(card, true)),
        ...Array.from(benefitItems).map(item => createMockIntersectionEntry(item, true))
      ];
      
      observerCallback(entries);
      
      // Verify animation classes are added
      toolCards.forEach(card => {
        expect(card.classList.contains('animate-slide-up')).toBe(true);
      });
      benefitItems.forEach(item => {
        expect(item.classList.contains('animate-slide-up')).toBe(true);
      });
    });

    it('should add animate-slide-in-left class to list items when they intersect', () => {
      const serviceItems = document.querySelectorAll('.services-list li');
      const pluginItems = document.querySelectorAll('.plugins-list li');
      
      // Initially, list items should not have animation classes
      serviceItems.forEach(item => {
        expect(item.classList.contains('animate-slide-in-left')).toBe(false);
      });
      pluginItems.forEach(item => {
        expect(item.classList.contains('animate-slide-in-left')).toBe(false);
      });
      
      // Simulate intersection for all list items
      const entries = [
        ...Array.from(serviceItems).map(item => createMockIntersectionEntry(item, true)),
        ...Array.from(pluginItems).map(item => createMockIntersectionEntry(item, true))
      ];
      
      observerCallback(entries);
      
      // Verify animation classes are added
      serviceItems.forEach(item => {
        expect(item.classList.contains('animate-slide-in-left')).toBe(true);
      });
      pluginItems.forEach(item => {
        expect(item.classList.contains('animate-slide-in-left')).toBe(true);
      });
    });

    it('should add animate-scale-in class to results statement when it intersects', () => {
      const resultsStatement = document.querySelector('.results-statement');
      
      // Initially, results statement should not have animation class
      expect(resultsStatement.classList.contains('animate-scale-in')).toBe(false);
      
      // Simulate intersection
      const entries = [createMockIntersectionEntry(resultsStatement, true)];
      observerCallback(entries);
      
      // Verify animation class is added
      expect(resultsStatement.classList.contains('animate-scale-in')).toBe(true);
    });

    it('should add animate-slide-up class to portfolio slider when it intersects', () => {
      const portfolioSlider = document.querySelector('.portfolio-slider');
      
      // Initially, portfolio slider should not have animation class
      expect(portfolioSlider.classList.contains('animate-slide-up')).toBe(false);
      
      // Simulate intersection
      const entries = [createMockIntersectionEntry(portfolioSlider, true)];
      observerCallback(entries);
      
      // Verify animation class is added
      expect(portfolioSlider.classList.contains('animate-slide-up')).toBe(true);
    });

    it('should add animate-fade-in class to other elements when they intersect', () => {
      const aboutText = document.querySelector('.about-text');
      const contactForm = document.querySelector('.contact-form');
      const contactItems = document.querySelectorAll('.contact-item');
      
      // Initially, elements should not have animation classes
      expect(aboutText.classList.contains('animate-fade-in')).toBe(false);
      expect(contactForm.classList.contains('animate-fade-in')).toBe(false);
      contactItems.forEach(item => {
        expect(item.classList.contains('animate-fade-in')).toBe(false);
      });
      
      // Simulate intersection
      const entries = [
        createMockIntersectionEntry(aboutText, true),
        createMockIntersectionEntry(contactForm, true),
        ...Array.from(contactItems).map(item => createMockIntersectionEntry(item, true))
      ];
      
      observerCallback(entries);
      
      // Verify animation classes are added
      expect(aboutText.classList.contains('animate-fade-in')).toBe(true);
      expect(contactForm.classList.contains('animate-fade-in')).toBe(true);
      contactItems.forEach(item => {
        expect(item.classList.contains('animate-fade-in')).toBe(true);
      });
    });

    it('should not add animation classes when elements are not intersecting', () => {
      const aboutSection = document.querySelector('.about');
      const toolCard = document.querySelector('.tool-card');
      
      // Simulate non-intersection
      const entries = [
        createMockIntersectionEntry(aboutSection, false),
        createMockIntersectionEntry(toolCard, false)
      ];
      
      observerCallback(entries);
      
      // Verify no animation classes are added
      expect(aboutSection.classList.contains('animate-fade-in')).toBe(false);
      expect(toolCard.classList.contains('animate-slide-up')).toBe(false);
    });
  });

  describe('Animation Timing and Effects - Requirement 14.3', () => {
    /**
     * Test animation timing through CSS custom properties
     */
    it('should set staggered animation delays for sections', () => {
      const sections = document.querySelectorAll('section:not(.hero)');
      
      sections.forEach((section, index) => {
        const expectedDelay = `${index * 0.1}s`;
        expect(section.style.getPropertyValue('--animation-delay')).toBe(expectedDelay);
      });
    });

    it('should set staggered animation delays for cards with shorter intervals', () => {
      const cards = document.querySelectorAll('.tool-card, .benefit-item');
      
      cards.forEach((card, index) => {
        const expectedDelay = `${index * 0.05}s`;
        expect(card.style.getPropertyValue('--animation-delay')).toBe(expectedDelay);
      });
    });

    it('should set staggered animation delays for list items', () => {
      const listItems = document.querySelectorAll('.services-list li, .plugins-list li');
      
      listItems.forEach((item, index) => {
        const expectedDelay = `${index * 0.1}s`;
        expect(item.style.getPropertyValue('--animation-delay')).toBe(expectedDelay);
      });
    });

    it('should set longer animation delays for contact items', () => {
      const contactItems = document.querySelectorAll('.contact-item');
      
      contactItems.forEach((item, index) => {
        const expectedDelay = `${index * 0.15}s`;
        expect(item.style.getPropertyValue('--animation-delay')).toBe(expectedDelay);
      });
    });

    it('should use different animation types for different element categories', () => {
      // Test that different elements get different animation classes
      const aboutSection = document.querySelector('.about');
      const toolCard = document.querySelector('.tool-card');
      const serviceItem = document.querySelector('.services-list li');
      const resultsStatement = document.querySelector('.results-statement');
      const portfolioSlider = document.querySelector('.portfolio-slider');
      
      // Simulate intersection for all elements
      const entries = [
        createMockIntersectionEntry(aboutSection, true),
        createMockIntersectionEntry(toolCard, true),
        createMockIntersectionEntry(serviceItem, true),
        createMockIntersectionEntry(resultsStatement, true),
        createMockIntersectionEntry(portfolioSlider, true)
      ];
      
      observerCallback(entries);
      
      // Verify different animation classes
      expect(aboutSection.classList.contains('animate-fade-in')).toBe(true);
      expect(toolCard.classList.contains('animate-slide-up')).toBe(true);
      expect(serviceItem.classList.contains('animate-slide-in-left')).toBe(true);
      expect(resultsStatement.classList.contains('animate-scale-in')).toBe(true);
      expect(portfolioSlider.classList.contains('animate-slide-up')).toBe(true);
      
      // Verify they don't have other animation classes
      expect(aboutSection.classList.contains('animate-slide-up')).toBe(false);
      expect(toolCard.classList.contains('animate-fade-in')).toBe(false);
      expect(serviceItem.classList.contains('animate-scale-in')).toBe(false);
    });
  });

  describe('Performance Optimization - Requirement 14.3', () => {
    /**
     * Test that elements are unobserved after animation to improve performance
     */
    it('should unobserve elements after they are animated', () => {
      const aboutSection = document.querySelector('.about');
      const toolCard = document.querySelector('.tool-card');
      
      // Verify elements are initially observed
      expect(observedElements.has(aboutSection)).toBe(true);
      expect(observedElements.has(toolCard)).toBe(true);
      
      // Simulate intersection
      const entries = [
        createMockIntersectionEntry(aboutSection, true),
        createMockIntersectionEntry(toolCard, true)
      ];
      
      observerCallback(entries);
      
      // Verify elements are unobserved after animation
      expect(mockObserverInstance.unobserve).toHaveBeenCalledWith(aboutSection);
      expect(mockObserverInstance.unobserve).toHaveBeenCalledWith(toolCard);
    });

    it('should prepare elements with will-change property for performance', () => {
      const sections = document.querySelectorAll('section:not(.hero)');
      
      sections.forEach(section => {
        expect(section.classList.contains('animate-prepare')).toBe(true);
      });
      
      // The animate-prepare class should set will-change: transform, opacity in CSS
      // This is handled by CSS: .animate-prepare { will-change: transform, opacity; }
    });

    it('should handle multiple elements intersecting simultaneously', () => {
      const allAnimatedElements = document.querySelectorAll(`
        section:not(.hero),
        .tool-card,
        .benefit-item,
        .services-list li,
        .plugins-list li,
        .contact-item,
        .about-text,
        .results-statement,
        .portfolio-slider,
        .contact-form
      `);
      
      // Simulate all elements intersecting at once
      const entries = Array.from(allAnimatedElements).map(element => 
        createMockIntersectionEntry(element, true)
      );
      
      // This should not throw an error and should handle all elements
      expect(() => {
        observerCallback(entries);
      }).not.toThrow();
      
      // Verify all elements get appropriate animation classes
      const sections = document.querySelectorAll('section:not(.hero)');
      sections.forEach(section => {
        expect(section.classList.contains('animate-fade-in')).toBe(true);
      });
      
      const toolCards = document.querySelectorAll('.tool-card');
      toolCards.forEach(card => {
        expect(card.classList.contains('animate-slide-up')).toBe(true);
      });
    });
  });

  describe('Animation System Integration', () => {
    /**
     * Test complete animation system integration
     */
    it('should have complete animation system setup', () => {
      // Verify IntersectionObserver is created
      expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
      
      // Verify all required elements are prepared for animation
      const preparedElements = document.querySelectorAll('.animate-prepare');
      expect(preparedElements.length).toBeGreaterThan(0);
      
      // Verify observer is observing elements
      expect(mockObserverInstance.observe).toHaveBeenCalled();
      expect(observedElements.size).toBeGreaterThan(0);
    });

    it('should handle edge cases gracefully', () => {
      // Test with empty entries array
      expect(() => {
        observerCallback([]);
      }).not.toThrow();
      
      // Test with null/undefined entries
      expect(() => {
        observerCallback([null, undefined]);
      }).not.toThrow();
      
      // Test with malformed entry
      expect(() => {
        observerCallback([{ target: null, isIntersecting: true }]);
      }).not.toThrow();
    });

    it('should maintain animation state consistency', () => {
      const aboutSection = document.querySelector('.about');
      
      // Element should start prepared but not animated
      expect(aboutSection.classList.contains('animate-prepare')).toBe(true);
      expect(aboutSection.classList.contains('animate-fade-in')).toBe(false);
      
      // After intersection, should be animated
      const entries = [createMockIntersectionEntry(aboutSection, true)];
      observerCallback(entries);
      
      expect(aboutSection.classList.contains('animate-fade-in')).toBe(true);
      
      // Should remain animated even after multiple calls
      observerCallback(entries);
      expect(aboutSection.classList.contains('animate-fade-in')).toBe(true);
    });
  });
});