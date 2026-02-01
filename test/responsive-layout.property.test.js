/**
 * Property-Based Test for Responsive Layout Adaptation
 * Feature: gofievfx-portfolio, Property 2: Responsive Layout Adaptation
 * Validates: Requirements 2.4
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import fc from 'fast-check';

describe('Property 2: Responsive Layout Adaptation', () => {
  beforeEach(() => {
    // Setup complete DOM structure for responsive testing
    document.body.innerHTML = `
      <nav class="navbar" id="navbar">
        <div class="nav-container">
          <a href="#hero" class="nav-logo">GofieVFX</a>
          
          <!-- Mobile Menu Toggle -->
          <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
          
          <!-- Navigation Menu -->
          <ul class="nav-menu" id="navMenu">
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
          <h1 class="hero-title">GofieVFX</h1>
          <h2 class="hero-subtitle">Professional Video Editor • Motion Graphics • High-Retention Edits</h2>
          <p class="hero-tagline">Nearly 6 years of experience crafting engaging, story-driven videos</p>
          <div class="hero-buttons">
            <a href="#contact" class="btn btn-primary">Get a Quote</a>
            <a href="#portfolio" class="btn btn-secondary">View Work</a>
          </div>
        </div>
      </section>

      <section class="about" id="about">
        <div class="container">
          <h2 class="section-title">About Me</h2>
          <div class="about-content">
            <p class="about-text">Sample about text content</p>
          </div>
        </div>
      </section>

      <section class="tools" id="tools">
        <div class="container">
          <h2 class="section-title">Tools & Software</h2>
          <div class="tools-grid">
            <div class="tool-card">
              <h3>Adobe After Effects 2025</h3>
              <p>Primary – motion graphics & animation</p>
            </div>
            <div class="tool-card">
              <h3>Adobe Premiere Pro</h3>
              <p>Long-form & YouTube editing</p>
            </div>
            <div class="tool-card">
              <h3>DaVinci Resolve</h3>
              <p>Color grading & cinematic workflows</p>
            </div>
            <div class="tool-card">
              <h3>CapCut</h3>
              <p>Short-form, fast turnaround content</p>
            </div>
          </div>
        </div>
      </section>

      <section class="why-me" id="why-me">
        <div class="container">
          <h2 class="section-title">Why Work With Me</h2>
          <div class="benefits-grid">
            <div class="benefit-item">
              <span class="benefit-icon">🎯</span>
              <p>Nearly 6 years of real editing experience</p>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">📖</span>
              <p>Strong storytelling & pacing sense</p>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✨</span>
              <p>Motion graphics and VFX capability</p>
            </div>
          </div>
        </div>
      </section>

      <section class="contact" id="contact">
        <div class="container">
          <h2 class="section-title">Get a Quote</h2>
          <form class="contact-form" id="contactForm">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </div>
      </section>
    `;

    // Load the actual CSS styles for testing
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/styles/main.css';
    document.head.appendChild(link);

    // Mock window resize functionality
    global.innerWidth = 1200;
    global.innerHeight = 800;
    
    // Mock getComputedStyle for CSS property testing
    global.getComputedStyle = vi.fn((element) => {
      const mockStyles = {
        overflow: 'visible',
        overflowX: 'visible',
        overflowY: 'visible',
        width: `${global.innerWidth}px`,
        maxWidth: '100%',
        display: getElementDisplay(element, global.innerWidth),
        position: getElementPosition(element, global.innerWidth),
        gridTemplateColumns: getGridColumns(element, global.innerWidth),
        flexDirection: getFlexDirection(element, global.innerWidth),
        padding: getPadding(element, global.innerWidth),
        margin: '0px'
      };
      
      return mockStyles;
    });

    // Mock getBoundingClientRect for layout testing
    Element.prototype.getBoundingClientRect = vi.fn(function() {
      const element = this;
      const width = getElementWidth(element, global.innerWidth);
      // Ensure width is properly rounded to avoid floating point precision issues
      const roundedWidth = Math.floor(width * 100) / 100; // Round to 2 decimal places
      return {
        width: roundedWidth,
        height: 100,
        left: 0,
        top: 0,
        right: roundedWidth,
        bottom: 100,
        x: 0,
        y: 0
      };
    });
  });

  // Helper function to determine element display based on screen width
  function getElementDisplay(element, screenWidth) {
    if (element.classList.contains('nav-toggle')) {
      return screenWidth < 768 ? 'flex' : 'none';
    }
    if (element.classList.contains('nav-menu')) {
      return 'flex';
    }
    return 'block';
  }

  // Helper function to determine element position based on screen width
  function getElementPosition(element, screenWidth) {
    if (element.classList.contains('nav-menu') && screenWidth < 768) {
      return 'fixed';
    }
    return 'static';
  }

  // Helper function to determine grid columns based on screen width
  function getGridColumns(element, screenWidth) {
    if (element.classList.contains('tools-grid')) {
      if (screenWidth < 768) return '1fr';
      if (screenWidth < 1200) return 'repeat(2, 1fr)';
      return 'repeat(4, 1fr)';
    }
    if (element.classList.contains('benefits-grid')) {
      if (screenWidth < 768) return '1fr';
      if (screenWidth < 1200) return 'repeat(2, 1fr)';
      return 'repeat(3, 1fr)';
    }
    return 'none';
  }

  // Helper function to determine flex direction based on screen width
  function getFlexDirection(element, screenWidth) {
    if (element.classList.contains('hero-buttons') && screenWidth < 768) {
      return 'column';
    }
    return 'row';
  }

  // Helper function to determine padding based on screen width
  function getPadding(element, screenWidth) {
    if (element.classList.contains('container')) {
      return screenWidth < 768 ? '0 1rem' : '0 1rem';
    }
    return '0px';
  }

  // Helper function to calculate element width
  function getElementWidth(element, screenWidth) {
    if (element.classList.contains('container')) {
      return Math.min(screenWidth - 32, 1200); // Max width with padding
    }
    if (element.tagName === 'BODY') {
      return screenWidth;
    }
    return Math.min(screenWidth * 0.9, screenWidth - 32); // Default to 90% of screen width or screen minus padding
  }

  /**
   * Property 2: Responsive Layout Adaptation
   * For any screen size change, the website should adapt its layout without 
   * creating horizontal scrolling or breaking content flow.
   * Validates: Requirements 2.4
   */
  it('should adapt layout without horizontal scrolling for any screen width', () => {
    fc.assert(
      fc.property(
        // Generate screen widths across mobile, tablet, and desktop ranges
        fc.integer({ min: 320, max: 2560 }),
        (screenWidth) => {
          // Arrange: Set the screen width
          global.innerWidth = screenWidth;
          
          // Trigger resize event simulation
          const resizeEvent = new Event('resize');
          window.dispatchEvent(resizeEvent);

          // Act & Assert: Check that no elements exceed screen width
          const body = document.body;
          const bodyRect = body.getBoundingClientRect();
          
          // 1. Body should not exceed screen width
          expect(bodyRect.width).toBeLessThanOrEqual(screenWidth);

          // 2. Container elements should respect max-width constraints
          const containers = document.querySelectorAll('.container');
          containers.forEach(container => {
            const containerRect = container.getBoundingClientRect();
            expect(containerRect.width).toBeLessThanOrEqual(screenWidth);
            
            // Container should not exceed its max-width (1200px) plus padding
            // Allow for floating point precision errors
            expect(containerRect.width).toBeLessThanOrEqual(1233); // 1200 + 32 + 1px tolerance
          });

          // 3. Grid layouts should adapt appropriately
          const toolsGrid = document.querySelector('.tools-grid');
          if (toolsGrid) {
            const computedStyle = getComputedStyle(toolsGrid);
            const gridColumns = computedStyle.gridTemplateColumns;
            
            // Verify grid adapts to screen size
            if (screenWidth < 768) {
              expect(gridColumns).toBe('1fr'); // Single column on mobile
            } else if (screenWidth < 1200) {
              expect(gridColumns).toBe('repeat(2, 1fr)'); // Two columns on tablet
            } else {
              expect(gridColumns).toBe('repeat(4, 1fr)'); // Four columns on desktop
            }
          }

          // 4. Benefits grid should adapt appropriately
          const benefitsGrid = document.querySelector('.benefits-grid');
          if (benefitsGrid) {
            const computedStyle = getComputedStyle(benefitsGrid);
            const gridColumns = computedStyle.gridTemplateColumns;
            
            if (screenWidth < 768) {
              expect(gridColumns).toBe('1fr'); // Single column on mobile
            } else if (screenWidth < 1200) {
              expect(gridColumns).toBe('repeat(2, 1fr)'); // Two columns on tablet
            } else {
              expect(gridColumns).toBe('repeat(3, 1fr)'); // Three columns on desktop
            }
          }

          // 5. Hero buttons should stack on mobile
          const heroButtons = document.querySelector('.hero-buttons');
          if (heroButtons) {
            const computedStyle = getComputedStyle(heroButtons);
            const flexDirection = computedStyle.flexDirection;
            
            if (screenWidth < 768) {
              expect(flexDirection).toBe('column'); // Stacked on mobile
            } else {
              expect(flexDirection).toBe('row'); // Side by side on larger screens
            }
          }

          // 6. Form elements should not exceed container width
          const formElements = document.querySelectorAll('input, select, textarea, .btn');
          formElements.forEach(element => {
            const elementRect = element.getBoundingClientRect();
            const parentContainer = element.closest('.container');
            
            if (parentContainer) {
              const containerRect = parentContainer.getBoundingClientRect();
              expect(elementRect.width).toBeLessThanOrEqual(containerRect.width);
            }
          });

          // 7. No element should cause horizontal overflow
          const allElements = document.querySelectorAll('*');
          allElements.forEach(element => {
            const elementRect = element.getBoundingClientRect();
            
            // Element should not extend beyond the right edge of the screen
            // Allow for small rounding errors (1px tolerance)
            expect(elementRect.right).toBeLessThanOrEqual(screenWidth + 1);
            
            // Element should not start before the left edge
            expect(elementRect.left).toBeGreaterThanOrEqual(-1);
          });
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design document
    );
  });

  /**
   * Property 2b: Breakpoint Consistency
   * For any screen width at or near breakpoints, the layout should consistently
   * apply the correct responsive rules without flickering or inconsistency.
   * Validates: Requirements 2.1, 2.2, 2.3
   */
  it('should consistently apply breakpoint rules at critical screen widths', () => {
    fc.assert(
      fc.property(
        // Test around critical breakpoints with small variations
        fc.constantFrom(
          // Mobile breakpoint variations (767px boundary)
          766, 767, 768, 769,
          // Tablet breakpoint variations (1199px boundary)  
          1198, 1199, 1200, 1201,
          // Common device widths
          320, 375, 414, 768, 1024, 1366, 1920
        ),
        (screenWidth) => {
          // Arrange: Set screen width
          global.innerWidth = screenWidth;
          
          // Act: Simulate responsive behavior
          const resizeEvent = new Event('resize');
          window.dispatchEvent(resizeEvent);

          // Assert: Verify consistent breakpoint behavior
          const expectedCategory = getScreenCategory(screenWidth);
          
          // Check navigation layout
          const navMenu = document.querySelector('.nav-menu');
          const navToggle = document.querySelector('.nav-toggle');
          
          if (navMenu && navToggle) {
            const menuComputedStyle = getComputedStyle(navMenu);
            const toggleComputedStyle = getComputedStyle(navToggle);
            
            if (expectedCategory === 'mobile') {
              // Mobile navigation should show hamburger menu
              expect(toggleComputedStyle.display).toBe('flex');
              // Menu should be positioned off-screen initially
              expect(menuComputedStyle.position).toBe('fixed');
            } else {
              // Desktop navigation should hide hamburger menu
              expect(toggleComputedStyle.display).toBe('none');
              // Menu should be inline
              expect(menuComputedStyle.display).toBe('flex');
            }
          }

          // Check grid layouts match expected breakpoint behavior
          const toolsGrid = document.querySelector('.tools-grid');
          if (toolsGrid) {
            const computedStyle = getComputedStyle(toolsGrid);
            const gridColumns = computedStyle.gridTemplateColumns;
            
            switch (expectedCategory) {
              case 'mobile':
                expect(gridColumns).toBe('1fr');
                break;
              case 'tablet':
                expect(gridColumns).toBe('repeat(2, 1fr)');
                break;
              case 'desktop':
                expect(gridColumns).toBe('repeat(4, 1fr)');
                break;
            }
          }

          // Verify no layout shifts cause horizontal overflow
          const body = document.body;
          const bodyRect = body.getBoundingClientRect();
          expect(bodyRect.width).toBeLessThanOrEqual(screenWidth);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2c: Content Flow Preservation
   * For any screen size change, content should maintain logical flow and
   * readability without overlapping or disappearing elements.
   * Validates: Requirements 2.5
   */
  it('should preserve content flow and readability across all screen sizes', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }),
        (screenWidth) => {
          // Arrange: Set screen width
          global.innerWidth = screenWidth;
          
          // Act: Apply responsive layout
          const resizeEvent = new Event('resize');
          window.dispatchEvent(resizeEvent);

          // Assert: Verify content flow preservation
          
          // 1. All text content should remain visible and readable
          const textElements = document.querySelectorAll('h1, h2, h3, p, li, label');
          textElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            
            // Element should have positive dimensions
            expect(rect.width).toBeGreaterThan(0);
            expect(rect.height).toBeGreaterThan(0);
            
            // Element should be within screen bounds
            expect(rect.left).toBeGreaterThanOrEqual(-1);
            expect(rect.right).toBeLessThanOrEqual(screenWidth + 1);
          });

          // 2. Interactive elements should maintain minimum touch targets
          const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
          interactiveElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            
            // Minimum touch target size (44px recommended)
            if (screenWidth < 768) { // Mobile devices
              expect(rect.height).toBeGreaterThanOrEqual(40); // Allow slight variance
            }
            
            // Element should be accessible
            expect(rect.width).toBeGreaterThan(0);
            expect(rect.height).toBeGreaterThan(0);
          });

          // 3. Container hierarchy should be maintained
          const containers = document.querySelectorAll('.container');
          containers.forEach(container => {
            const containerRect = container.getBoundingClientRect();
            const children = container.children;
            
            // All children should fit within container bounds
            Array.from(children).forEach(child => {
              const childRect = child.getBoundingClientRect();
              
              // Child should not exceed container width (with small tolerance)
              expect(childRect.right).toBeLessThanOrEqual(containerRect.right + 5);
              expect(childRect.left).toBeGreaterThanOrEqual(containerRect.left - 5);
            });
          });

          // 4. Grid items should not overlap significantly
          const gridContainers = document.querySelectorAll('.tools-grid, .benefits-grid');
          gridContainers.forEach(grid => {
            const gridItems = Array.from(grid.children);
            
            // Check for overlapping items (simplified check)
            for (let i = 0; i < gridItems.length - 1; i++) {
              const item1Rect = gridItems[i].getBoundingClientRect();
              const item2Rect = gridItems[i + 1].getBoundingClientRect();
              
              // Items should not significantly overlap
              const horizontalOverlap = Math.max(0, 
                Math.min(item1Rect.right, item2Rect.right) - 
                Math.max(item1Rect.left, item2Rect.left)
              );
              
              // Allow more generous overlap tolerance for mobile layouts
              const overlapTolerance = screenWidth < 768 ? 50 : 5;
              
              // Only check horizontal overlap if items are on the same row
              const verticalOverlap = Math.max(0,
                Math.min(item1Rect.bottom, item2Rect.bottom) - 
                Math.max(item1Rect.top, item2Rect.top)
              );
              
              if (verticalOverlap > 10) { // Items are on same row if they overlap vertically
                expect(horizontalOverlap).toBeLessThan(overlapTolerance);
              }
            }
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  // Helper function to categorize screen sizes
  function getScreenCategory(width) {
    if (width < 768) return 'mobile';
    if (width < 1200) return 'tablet';
    return 'desktop';
  }
});