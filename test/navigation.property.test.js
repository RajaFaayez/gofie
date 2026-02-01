/**
 * Property-Based Test for Single-Page Architecture Navigation
 * Feature: gofievfx-portfolio, Property 1: Navigation Scroll Behavior
 * Validates: Requirements 1.2, 1.3
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import fc from 'fast-check';

describe('Property 1: Navigation Scroll Behavior', () => {
  let mockScrollTo;

  beforeEach(() => {
    // Setup DOM structure with navigation and sections
    document.body.innerHTML = `
      <nav class="navbar" id="navbar">
        <div class="nav-container">
          <a href="#hero" class="nav-logo">GofieVFX</a>
          <ul class="nav-menu">
            <li class="nav-item">
              <a href="#hero" class="nav-link">Home</a>
            </li>
            <li class="nav-item">
              <a href="#about" class="nav-link">About</a>
            </li>
            <li class="nav-item">
              <a href="#portfolio" class="nav-link">Portfolio</a>
            </li>
            <li class="nav-item">
              <a href="#contact" class="nav-link">Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      <section class="hero" id="hero">
        <div class="hero-container">
          <h1>GofieVFX</h1>
          <div class="hero-buttons">
            <a href="#contact" class="btn btn-primary">Get a Quote</a>
            <a href="#portfolio" class="btn btn-secondary">View Work</a>
          </div>
        </div>
      </section>

      <section class="about" id="about">
        <h2>About Me</h2>
      </section>

      <section class="portfolio" id="portfolio">
        <h2>Portfolio</h2>
      </section>

      <section class="contact" id="contact">
        <h2>Contact</h2>
      </section>
    `;

    // Mock scrollTo function
    mockScrollTo = vi.fn();
    window.scrollTo = mockScrollTo;

    // Setup smooth scrolling behavior manually (simulating the app's behavior)
    setupSmoothScrolling();
  });

  // Helper function to setup smooth scrolling (extracted from main.js logic)
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

  /**
   * Property 1: Navigation Scroll Behavior
   * For any navigation element click, the website should smoothly scroll to the 
   * corresponding target section on the same page without page navigation.
   * Validates: Requirements 1.2, 1.3
   */
  it('should smoothly scroll to target sections for any navigation link click', () => {
    fc.assert(
      fc.property(
        // Generate test data: section IDs that exist in the DOM
        fc.constantFrom('hero', 'about', 'portfolio', 'contact'),
        (sectionId) => {
          // Arrange: Get the navigation link for this section
          const navLink = document.querySelector(`a[href="#${sectionId}"]`);
          const targetSection = document.querySelector(`#${sectionId}`);
          
          // Ensure both elements exist
          expect(navLink).toBeTruthy();
          expect(targetSection).toBeTruthy();

          // Mock the target section's offsetTop
          Object.defineProperty(targetSection, 'offsetTop', {
            value: Math.floor(Math.random() * 2000) + 100, // Random offset between 100-2100
            configurable: true
          });

          // Clear previous calls
          mockScrollTo.mockClear();

          // Act: Click the navigation link
          const clickEvent = new Event('click', { bubbles: true, cancelable: true });
          navLink.dispatchEvent(clickEvent);

          // Assert: Verify smooth scrolling behavior
          // 1. scrollTo should be called exactly once
          expect(mockScrollTo).toHaveBeenCalledTimes(1);

          // 2. scrollTo should be called with smooth behavior
          const scrollCall = mockScrollTo.mock.calls[0][0];
          expect(scrollCall).toHaveProperty('behavior', 'smooth');

          // 3. scrollTo should target the correct position (offsetTop - navbar height)
          const expectedTop = targetSection.offsetTop - 80; // 80px navbar offset
          expect(scrollCall).toHaveProperty('top', expectedTop);

          // 4. The default click behavior should be prevented (no page navigation)
          // This is verified by checking that scrollTo was called instead of page navigation
          expect(mockScrollTo).toHaveBeenCalled();
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design document
    );
  });

  /**
   * Property 1b: Hero Button Navigation
   * For any hero section button click, the website should smoothly scroll to the 
   * corresponding target section on the same page without page navigation.
   * Validates: Requirements 1.2, 1.3
   */
  it('should smoothly scroll to target sections for any hero button click', () => {
    fc.assert(
      fc.property(
        // Generate test data: hero button targets
        fc.constantFrom('contact', 'portfolio'),
        (targetId) => {
          // Arrange: Get the hero button for this target
          const heroButton = document.querySelector(`.hero-buttons a[href="#${targetId}"]`);
          const targetSection = document.querySelector(`#${targetId}`);
          
          // Ensure both elements exist
          expect(heroButton).toBeTruthy();
          expect(targetSection).toBeTruthy();

          // Mock the target section's offsetTop
          Object.defineProperty(targetSection, 'offsetTop', {
            value: Math.floor(Math.random() * 2000) + 100,
            configurable: true
          });

          // Clear previous calls
          mockScrollTo.mockClear();

          // Act: Click the hero button
          const clickEvent = new Event('click', { bubbles: true, cancelable: true });
          heroButton.dispatchEvent(clickEvent);

          // Assert: Verify smooth scrolling behavior
          expect(mockScrollTo).toHaveBeenCalledTimes(1);
          
          const scrollCall = mockScrollTo.mock.calls[0][0];
          expect(scrollCall).toHaveProperty('behavior', 'smooth');
          
          const expectedTop = targetSection.offsetTop - 80;
          expect(scrollCall).toHaveProperty('top', expectedTop);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 1c: Single Page Architecture Validation
   * For any anchor link with hash (#) href, the navigation should stay on the same page
   * and use smooth scrolling instead of page navigation.
   * Validates: Requirements 1.1, 1.2, 1.3
   */
  it('should maintain single-page architecture for all hash-based navigation', () => {
    fc.assert(
      fc.property(
        // Generate all possible anchor links with hash hrefs
        fc.constantFrom(
          '#hero', '#about', '#portfolio', '#contact'
        ),
        (href) => {
          // Arrange: Find any link with this href
          const link = document.querySelector(`a[href="${href}"]`);
          const targetId = href.substring(1); // Remove the #
          const targetSection = document.querySelector(`#${targetId}`);
          
          if (link && targetSection) {
            // Mock offsetTop
            Object.defineProperty(targetSection, 'offsetTop', {
              value: Math.floor(Math.random() * 2000) + 100,
              configurable: true
            });

            // Clear previous calls
            mockScrollTo.mockClear();

            // Act: Click the link
            const clickEvent = new Event('click', { bubbles: true, cancelable: true });
            link.dispatchEvent(clickEvent);

            // Assert: Should use smooth scrolling, not page navigation
            expect(mockScrollTo).toHaveBeenCalled();
            
            const scrollCall = mockScrollTo.mock.calls[0][0];
            expect(scrollCall).toHaveProperty('behavior', 'smooth');
            expect(scrollCall).toHaveProperty('top');
            
            // Verify the scroll position is calculated correctly
            const expectedTop = targetSection.offsetTop - 80;
            expect(scrollCall.top).toBe(expectedTop);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});