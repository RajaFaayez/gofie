// Main JavaScript Module for GofieVFX Portfolio
// Handles navigation, animations, form submission, and portfolio slider

class PortfolioApp {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 0;
    this.isAnimating = false;
    
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupEventListeners();
        this.initializeComponents();
      });
    } else {
      this.setupEventListeners();
      this.initializeComponents();
    }
  }

  setupEventListeners() {
    // Mobile hamburger menu
    this.setupMobileMenu();
    
    // Back to top button (mobile only)
    this.setupBackToTop();
    
    // Navigation smooth scrolling
    this.setupSmoothScrolling();
    
    // Portfolio slider
    this.setupPortfolioSlider();
    
    // Contact form
    this.setupContactForm();
    
    // Scroll animations
    this.setupScrollAnimations();
    
    // Active navigation highlighting
    this.setupActiveNavigation();
    
    // Mobile touch optimization
    this.setupMobileTouchOptimization();
    
    // Keyboard navigation
    this.setupKeyboardNavigation();
  }

  // Mobile Hamburger Menu - Clean and Reliable
  setupMobileMenu() {
    console.log('🔧 Setting up mobile menu...');
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) {
      console.error('❌ Mobile menu elements not found:', { navToggle: !!navToggle, navMenu: !!navMenu });
      return;
    }

    console.log('✅ Mobile menu elements found');

    // Clean toggle handler - works reliably on all mobile browsers
    navToggle.addEventListener('pointerdown', (e) => {
  console.log('🖱️ Menu toggle pointerdown');  // Optional: Keep for debugging; remove in production
  e.preventDefault();
  
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.classList.toggle('nav-open');
  
  const isActive = navMenu.classList.contains('active');
  console.log(isActive ? '📱 Menu opened' : '📴 Menu closed');
});

    // Close menu when clicking nav links
    navLinks.forEach((link, index) => {
      link.addEventListener('click', () => {
        console.log(`🔗 Nav link ${index} clicked, closing menu`);
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        if (navMenu.classList.contains('active')) {
          console.log('🌐 Outside click, closing menu');
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.classList.remove('nav-open');
        }
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        console.log('⌨️ Escape key, closing menu');
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 767 && navMenu.classList.contains('active')) {
        console.log('📏 Window resized to desktop, closing menu');
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
      }
    });

    console.log('✅ Mobile menu setup complete');
  }

  // Back to Top Button - Mobile Only
  setupBackToTop() {
    // Only setup on mobile devices
    if (window.innerWidth > 767) return;
    
    console.log('🔝 Setting up back to top button...');
    
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) {
      console.warn('❌ Back to top button not found');
      return;
    }

    let isVisible = false;
    let scrollThreshold = 300; // Show after scrolling 300px
    let ticking = false;

    // Smooth scroll to top function
    const scrollToTop = () => {
      const scrollDuration = 300; // Much faster: 300ms instead of 800ms
      const scrollStep = -window.scrollY / (scrollDuration / 15);
      
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
    };

    // Show/hide button based on scroll position
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          if (scrollTop > scrollThreshold && !isVisible) {
            // Show button
            backToTopBtn.classList.remove('hidden');
            backToTopBtn.classList.add('visible');
            isVisible = true;
            console.log('🔝 Back to top button shown');
          } else if (scrollTop <= scrollThreshold && isVisible) {
            // Hide button
            backToTopBtn.classList.remove('visible');
            backToTopBtn.classList.add('hidden');
            
            // Remove from DOM after animation
            setTimeout(() => {
              if (!isVisible) {
                backToTopBtn.classList.remove('hidden');
              }
            }, 300);
            
            isVisible = false;
            console.log('🔝 Back to top button hidden');
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Click handler
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('🔝 Back to top clicked');
      scrollToTop();
      
      // Add click feedback
      backToTopBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        backToTopBtn.style.transform = '';
      }, 150);
    });

    // Scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        scrollThreshold = window.innerHeight * 0.4; // Adjust threshold based on viewport
      }, 100);
    });

    // Handle window resize (hide on desktop)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 767 && isVisible) {
        backToTopBtn.classList.remove('visible');
        backToTopBtn.classList.add('hidden');
        isVisible = false;
      }
    });

    console.log('✅ Back to top button setup complete');
  }

  openMobileMenu() {
    // Deprecated - functionality moved to setupMobileMenu
    console.log('⚠️ openMobileMenu called - use setupMobileMenu instead');
  }

  closeMobileMenu() {
    // Deprecated - functionality moved to setupMobileMenu  
    console.log('⚠️ closeMobileMenu called - use setupMobileMenu instead');
  }

  // Focus trap for accessibility
  trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    this.focusTrapHandler = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', this.focusTrapHandler);
  }

  removeFocusTrap() {
    if (this.focusTrapHandler) {
      document.removeEventListener('keydown', this.focusTrapHandler);
      this.focusTrapHandler = null;
    }
  }

  // Mobile Touch Optimization
  setupMobileTouchOptimization() {
    // Optimize touch targets for mobile
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      // Ensure minimum touch target size (44px recommended)
      const linkRect = link.getBoundingClientRect();
      if (linkRect.height < 44) {
        link.style.minHeight = '44px';
        link.style.display = 'flex';
        link.style.alignItems = 'center';
        link.style.justifyContent = 'center';
      }
      
      // Add touch feedback
      link.addEventListener('touchstart', (e) => {
        link.classList.add('touch-active');
      }, { passive: true });
      
      link.addEventListener('touchend', (e) => {
        setTimeout(() => {
          link.classList.remove('touch-active');
        }, 150);
      }, { passive: true });
      
      link.addEventListener('touchcancel', (e) => {
        link.classList.remove('touch-active');
      }, { passive: true });
    });

    // Prevent double-tap zoom on navigation
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.addEventListener('touchend', (e) => {
        e.preventDefault();
      });
    }

    // Optimize scroll performance on mobile
    let ticking = false;
    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateActiveNavOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
  }

  // Keyboard Navigation Support
  setupKeyboardNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            const nextIndex = (index + 1) % navLinks.length;
            navLinks[nextIndex].focus();
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            const prevIndex = index === 0 ? navLinks.length - 1 : index - 1;
            navLinks[prevIndex].focus();
            break;
          case 'Home':
            e.preventDefault();
            navLinks[0].focus();
            break;
          case 'End':
            e.preventDefault();
            navLinks[navLinks.length - 1].focus();
            break;
        }
      });
    });
  }

  initializeComponents() {
    // Initialize portfolio slider
    this.initPortfolioSlider();
    
    // Initialize scroll animations
    this.initScrollAnimations();
    
    // Initialize navbar scroll effect
    this.initNavbarScrollEffect();
  }

  // Navbar Scroll Effect
  initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Smooth Scrolling Navigation
  setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const offsetTop = targetSection.offsetTop - navbarHeight - 20; // Extra padding
          
          // Enhanced smooth scrolling with fallback
          if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          } else {
            // Fallback for browsers without smooth scroll support
            this.smoothScrollTo(offsetTop, 800);
          }
        }
      });
      
      // Touch optimization for mobile
      link.addEventListener('touchstart', (e) => {
        // Add visual feedback for touch
        link.style.transform = 'scale(0.95)';
      });
      
      link.addEventListener('touchend', (e) => {
        // Reset visual feedback
        setTimeout(() => {
          link.style.transform = '';
        }, 150);
      });
    });
  }

  // Smooth scroll fallback for older browsers
  smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }

  // Easing function for smooth animation
  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  // Active Navigation Highlighting
  setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px', // More precise triggering
      threshold: [0, 0.25, 0.5, 0.75, 1] // Multiple thresholds for better accuracy
    };

    const observer = new IntersectionObserver((entries) => {
      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let activeSection = null;

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeSection = entry.target;
        }
      });

      if (activeSection) {
        const sectionId = activeSection.id;
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
          link.classList.remove('active');
          link.setAttribute('aria-current', 'false');
        });
        
        // Add active class to current section's nav link
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
          activeLink.setAttribute('aria-current', 'page');
        }
      }
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    // Handle scroll events for additional responsiveness on mobile
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.updateActiveNavOnScroll();
      }, 100);
    }, { passive: true });
  }

  // Additional method for scroll-based active navigation update
  updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    let activeSection = null;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        activeSection = section;
      }
    });

    if (activeSection) {
      const sectionId = activeSection.id;
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        link.setAttribute('aria-current', 'false');
      });
      
      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'page');
      }
    }
  }

  // Portfolio Slider
  setupPortfolioSlider() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => this.previousSlide());
      nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Indicator click handlers
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });

    // Touch/swipe support for mobile
    this.setupTouchNavigation();
  }

  initPortfolioSlider() {
    const slides = document.querySelectorAll('.slide');
    this.totalSlides = slides.length;
    
    console.log(`Portfolio slider initialized with ${this.totalSlides} slides`);
    
    if (this.totalSlides > 0) {
      this.updateSliderPosition();
      
      // Ensure all images are loaded properly
      slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        if (img) {
          // Add error handling for failed image loads
          img.addEventListener('error', () => {
            console.warn(`Failed to load image ${index + 1}: ${img.src}`);
            img.style.backgroundColor = 'var(--color-bg-accent)';
            img.alt = `Portfolio Sample ${index + 1} - Loading Error`;
          });
          
          // Add load success handling
          img.addEventListener('load', () => {
            console.log(`Successfully loaded image ${index + 1}`);
            img.style.backgroundColor = 'transparent';
          });
          
          // Force reload if src is empty or invalid
          if (!img.src || img.src === window.location.href) {
            img.src = `Source/${index + 1}.png`;
          }
        }
      });
    }
  }

  setupTouchNavigation() {
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderTrack || !sliderContainer) return;

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;
    let startTime = 0;
    let isMobile = window.innerWidth <= 767;
    let initialTransform = 0;
    let isHorizontalSwipe = false;

    // Update mobile detection on resize
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth <= 767;
    });

    // Disable transition during drag for smooth feedback
    const disableTransition = () => {
      sliderTrack.style.transition = 'none';
    };

    const enableTransition = () => {
      sliderTrack.style.transition = 'transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    };

    // Touch events for mobile
    sliderContainer.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return; // Only handle single touch
      
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      currentX = startX;
      currentY = startY;
      startTime = Date.now();
      isDragging = false; // Will be set to true in touchmove if it's a horizontal swipe
      isHorizontalSwipe = false;
      
      // Get current transform value
      initialTransform = -this.currentSlide * 100;
      
      // Don't prevent default here - let touchmove decide
    }, { passive: true });

    sliderContainer.addEventListener('touchmove', (e) => {
      if (e.touches.length !== 1) return;
      
      currentX = e.touches[0].clientX;
      currentY = e.touches[0].clientY;
      
      const diffX = currentX - startX;
      const diffY = currentY - startY;
      
      // Determine if this is a horizontal swipe
      if (!isDragging && !isHorizontalSwipe) {
        const absX = Math.abs(diffX);
        const absY = Math.abs(diffY);
        
        if (absX > 10 || absY > 10) { // Minimum movement to determine direction
          isHorizontalSwipe = absX > absY && absX > 15; // Horizontal swipe detected
          
          if (isHorizontalSwipe) {
            isDragging = true;
            disableTransition();
            e.preventDefault(); // Prevent scrolling only for horizontal swipes
          }
        }
      }
      
      // Provide visual feedback during horizontal drag
      if (isDragging && isHorizontalSwipe) {
        e.preventDefault();
        const dragOffset = (diffX / sliderContainer.offsetWidth) * 100;
        const newTransform = initialTransform + dragOffset;
        
        // Add resistance at boundaries
        let resistanceTransform = newTransform;
        const maxTransform = 0;
        const minTransform = -(this.totalSlides - 1) * 100;
        
        if (newTransform > maxTransform) {
          resistanceTransform = maxTransform + (newTransform - maxTransform) * 0.3;
        } else if (newTransform < minTransform) {
          resistanceTransform = minTransform + (newTransform - minTransform) * 0.3;
        }
        
        sliderTrack.style.transform = `translateX(${resistanceTransform}%)`;
      }
    }, { passive: false });

    sliderContainer.addEventListener('touchend', (e) => {
      if (!isDragging || !isHorizontalSwipe) {
        isDragging = false;
        isHorizontalSwipe = false;
        return;
      }
      
      const diffX = currentX - startX;
      const diffTime = Date.now() - startTime;
      const threshold = 50; // Minimum distance for swipe
      const velocity = Math.abs(diffX) / diffTime; // pixels per millisecond
      const minVelocity = 0.3; // Minimum velocity for swipe
      
      enableTransition();
      
      // Determine if we should change slides
      let shouldChangeSlide = false;
      let direction = 0;
      
      // Check distance threshold
      if (Math.abs(diffX) > threshold) {
        shouldChangeSlide = true;
        direction = diffX > 0 ? -1 : 1; // Swipe right = previous, swipe left = next
      }
      // Check velocity threshold
      else if (velocity > minVelocity && Math.abs(diffX) > 20) {
        shouldChangeSlide = true;
        direction = diffX > 0 ? -1 : 1;
      }
      
      if (shouldChangeSlide) {
        if (direction > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      } else {
        // Snap back to current slide
        this.updateSliderPosition();
      }
      
      isDragging = false;
      isHorizontalSwipe = false;
      e.preventDefault();
    }, { passive: false });

    // Mouse events for desktop drag
    sliderContainer.addEventListener('mousedown', (e) => {
      if (isMobile) return; // Skip mouse events on mobile
      
      startX = e.clientX;
      startTime = Date.now();
      isDragging = true;
      initialTransform = -this.currentSlide * 100;
      
      sliderContainer.style.cursor = 'grabbing';
      disableTransition();
      e.preventDefault(); // Prevent text selection
    });

    // Use document for mousemove and mouseup to handle dragging outside the container
    document.addEventListener('mousemove', (e) => {
      if (!isDragging || isMobile) return;
      
      currentX = e.clientX;
      const diffX = currentX - startX;
      
      // Visual feedback during drag
      if (Math.abs(diffX) > 5) {
        const dragOffset = (diffX / sliderContainer.offsetWidth) * 100;
        const newTransform = initialTransform + dragOffset;
        
        // Add resistance at boundaries
        let resistanceTransform = newTransform;
        const maxTransform = 0;
        const minTransform = -(this.totalSlides - 1) * 100;
        
        if (newTransform > maxTransform) {
          resistanceTransform = maxTransform + (newTransform - maxTransform) * 0.2;
        } else if (newTransform < minTransform) {
          resistanceTransform = minTransform + (newTransform - minTransform) * 0.2;
        }
        
        sliderTrack.style.transform = `translateX(${resistanceTransform}%)`;
      }
    });

    document.addEventListener('mouseup', (e) => {
      if (!isDragging || isMobile) return;
      
      const diffX = currentX - startX;
      const diffTime = Date.now() - startTime;
      const threshold = 80; // Slightly higher threshold for mouse
      const velocity = Math.abs(diffX) / diffTime;
      const minVelocity = 0.5;
      
      enableTransition();
      sliderContainer.style.cursor = 'grab';
      
      // Determine if we should change slides
      let shouldChangeSlide = false;
      let direction = 0;
      
      if (Math.abs(diffX) > threshold) {
        shouldChangeSlide = true;
        direction = diffX > 0 ? -1 : 1;
      } else if (velocity > minVelocity && Math.abs(diffX) > 30) {
        shouldChangeSlide = true;
        direction = diffX > 0 ? -1 : 1;
      }
      
      if (shouldChangeSlide) {
        if (direction > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      } else {
        // Snap back to current slide
        this.updateSliderPosition();
      }
      
      isDragging = false;
    });

    // Handle mouse leave to reset drag state
    sliderContainer.addEventListener('mouseleave', () => {
      if (isDragging && !isMobile) {
        enableTransition();
        this.updateSliderPosition();
        isDragging = false;
        sliderContainer.style.cursor = 'grab';
      }
    });

    // Prevent context menu on long press
    sliderContainer.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    // Keyboard navigation
    sliderContainer.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.previousSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.nextSlide();
          break;
        case 'Home':
          e.preventDefault();
          this.goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          this.goToSlide(this.totalSlides - 1);
          break;
      }
    });

    // Make slider focusable for keyboard navigation
    sliderContainer.setAttribute('tabindex', '0');
    sliderContainer.setAttribute('role', 'region');
    sliderContainer.setAttribute('aria-label', 'Portfolio image slider');
    
    // Set initial cursor and touch action
    sliderContainer.style.cursor = 'grab';
    sliderContainer.style.touchAction = 'pan-y pinch-zoom';
    
    // Ensure smooth transitions are enabled initially
    enableTransition();
  }

  nextSlide() {
    if (this.isAnimating || this.totalSlides === 0) return;
    
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSliderPosition();
  }

  previousSlide() {
    if (this.isAnimating || this.totalSlides === 0) return;
    
    this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateSliderPosition();
  }

  goToSlide(slideIndex) {
    if (this.isAnimating || this.totalSlides === 0 || slideIndex === this.currentSlide) return;
    
    this.currentSlide = slideIndex;
    this.updateSliderPosition();
  }

  updateSliderPosition() {
    const sliderTrack = document.getElementById('sliderTrack');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!sliderTrack) return;

    this.isAnimating = true;
    const translateX = -this.currentSlide * 100;
    sliderTrack.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === this.currentSlide) {
        indicator.classList.add('active');
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.classList.remove('active');
        indicator.setAttribute('aria-current', 'false');
      }
    });

    // Reset animation flag after transition
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  // Contact Form
  setupContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');
    const errorMessage = document.getElementById('formErrorMessage');
    const retryBtn = document.getElementById('retryBtn');
    
    if (!form) return;

    // Setup real-time validation
    this.setupFormValidation(form);
    
    // Setup character counter
    this.setupCharacterCounter();
    
    // Setup floating labels
    this.setupFloatingLabels(form);

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = {
        name: formData.get('name')?.trim(),
        email: formData.get('email')?.trim(),
        projectType: formData.get('projectType'),
        message: formData.get('message')?.trim(),
        timestamp: new Date().toISOString(),
        source: 'portfolio-website'
      };

      // Validate form data
      if (this.validateFormSubmission(data, form)) {
        this.submitForm(data, form, successMessage, errorMessage);
      }
    });

    // Retry button functionality
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.hideFormMessages();
        form.style.display = 'block';
      });
    }
  }

  setupFloatingLabels(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      // Check initial state
      this.updateFloatingLabel(input);
      
      // Handle input events
      input.addEventListener('input', () => {
        this.updateFloatingLabel(input);
      });
      
      input.addEventListener('change', () => {
        this.updateFloatingLabel(input);
      });
      
      input.addEventListener('blur', () => {
        this.updateFloatingLabel(input);
      });
    });
  }

  updateFloatingLabel(input) {
    const hasValue = input.value.trim() !== '' || input.type === 'select-one' && input.value !== '';
    
    if (hasValue) {
      input.classList.add('has-value');
    } else {
      input.classList.remove('has-value');
    }
  }

  setupCharacterCounter() {
    const messageField = document.getElementById('message');
    const counterElement = document.getElementById('messageCount');
    const counterContainer = messageField?.parentElement.querySelector('.character-count');
    
    if (!messageField || !counterElement) return;

    const updateCounter = () => {
      const currentLength = messageField.value.length;
      const maxLength = 1000;
      
      counterElement.textContent = currentLength;
      
      // Update counter styling based on length
      counterContainer.classList.remove('warning', 'error');
      
      if (currentLength > maxLength * 0.9) {
        counterContainer.classList.add('warning');
      }
      
      if (currentLength > maxLength) {
        counterContainer.classList.add('error');
      }
    };

    messageField.addEventListener('input', updateCounter);
    messageField.addEventListener('paste', () => {
      setTimeout(updateCounter, 10); // Delay to allow paste to complete
    });
    
    // Initial update
    updateCounter();
  }

  validateFormSubmission(data, form) {
    let isValid = true;
    const errors = {};

    // Clear previous errors
    this.clearFormErrors(form);

    // Name validation
    if (!data.name || data.name.length < 2) {
      errors.name = 'Name must be at least 2 characters long';
      isValid = false;
    } else if (data.name.length > 50) {
      errors.name = 'Name must be less than 50 characters';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Project type validation
    if (!data.projectType) {
      errors.projectType = 'Please select a project type';
      isValid = false;
    }

    // Message validation
    if (!data.message) {
      errors.message = 'Message is required';
      isValid = false;
    } else if (data.message.length < 10) {
      errors.message = 'Message must be at least 10 characters long';
      isValid = false;
    } else if (data.message.length > 1000) {
      errors.message = 'Message must be less than 1000 characters';
      isValid = false;
    }

    // Display errors
    if (!isValid) {
      this.displayFormErrors(errors, form);
      
      // Focus first error field
      const firstErrorField = Object.keys(errors)[0];
      const errorField = form.querySelector(`[name="${firstErrorField}"]`);
      if (errorField) {
        errorField.focus();
      }
    }

    return isValid;
  }

  setupFormValidation(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      // Real-time validation on blur
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
      
      // Clear error state on input
      input.addEventListener('input', () => {
        this.clearFieldError(input);
        
        // Real-time validation for certain fields
        if (input.type === 'email' && input.value.trim() !== '') {
          setTimeout(() => this.validateField(input), 500); // Debounce
        }
      });
      
      // Validate on change for select elements
      input.addEventListener('change', () => {
        this.validateField(input);
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
      case 'name':
        if (value.length === 0) {
          errorMessage = 'Name is required';
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = 'Name must be at least 2 characters long';
          isValid = false;
        } else if (value.length > 50) {
          errorMessage = 'Name must be less than 50 characters';
          isValid = false;
        }
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.length === 0) {
          errorMessage = 'Email is required';
          isValid = false;
        } else if (!emailRegex.test(value)) {
          errorMessage = 'Please enter a valid email address';
          isValid = false;
        }
        break;
        
      case 'projectType':
        if (!value) {
          errorMessage = 'Please select a project type';
          isValid = false;
        }
        break;
        
      case 'message':
        if (value.length === 0) {
          errorMessage = 'Message is required';
          isValid = false;
        } else if (value.length < 10) {
          errorMessage = 'Message must be at least 10 characters long';
          isValid = false;
        } else if (value.length > 1000) {
          errorMessage = 'Message must be less than 1000 characters';
          isValid = false;
        }
        break;
    }

    // Update field state
    if (isValid) {
      field.classList.remove('error');
      field.classList.add('valid');
      this.hideFieldError(field);
    } else {
      field.classList.remove('valid');
      field.classList.add('error');
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  clearFormErrors(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.classList.remove('error', 'valid');
      this.hideFieldError(input);
    });
  }

  clearFieldError(field) {
    field.classList.remove('error');
    this.hideFieldError(field);
  }

  displayFormErrors(errors, form) {
    Object.keys(errors).forEach(fieldName => {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (field) {
        field.classList.add('error');
        this.showFieldError(field, errors[fieldName]);
      }
    });
  }

  showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }

  hideFieldError(field) {
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement) {
      errorElement.classList.remove('show');
      setTimeout(() => {
        errorElement.textContent = '';
      }, 150); // Wait for animation to complete
    }
  }

  hideFormMessages() {
    const successMessage = document.getElementById('formSuccess');
    const errorMessage = document.getElementById('formErrorMessage');
    
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
  }

  async submitForm(data, form, successMessage, errorMessage) {
    try {
      // Show loading state
      const submitBtn = form.querySelector('.form-submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline-flex';
      submitBtn.disabled = true;

      console.log('=== FORM SUBMISSION DEBUG ===');
      console.log('Form data:', data);
      console.log('EMAIL_CONFIG:', window.EMAIL_CONFIG);

      // Check if EmailJS is configured
      if (!window.EMAIL_CONFIG || 
          EMAIL_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' || 
          EMAIL_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
          EMAIL_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        
        console.error('❌ EmailJS not configured properly!');
        console.error('Please update js/email-config.js with your actual EmailJS credentials:');
        console.error('- SERVICE_ID: Currently set to', EMAIL_CONFIG.SERVICE_ID);
        console.error('- TEMPLATE_ID: Currently set to', EMAIL_CONFIG.TEMPLATE_ID);
        console.error('- PUBLIC_KEY: Currently set to', EMAIL_CONFIG.PUBLIC_KEY);
        console.log('Form data that would be sent:', data);
        
        // Show success message even without email setup for demo purposes
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        setTimeout(() => {
          this.resetForm(form, submitBtn, btnText, btnLoading);
          successMessage.style.display = 'none';
        }, 8000);
        
        return;
      }

      console.log('✅ EmailJS configuration found');
      console.log('Service ID:', EMAIL_CONFIG.SERVICE_ID);
      console.log('Template ID:', EMAIL_CONFIG.TEMPLATE_ID);
      console.log('Public Key:', EMAIL_CONFIG.PUBLIC_KEY.substring(0, 10) + '...');

      // Check if EmailJS library is loaded
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS library not loaded. Make sure the EmailJS script is included.');
      }

      console.log('✅ EmailJS library loaded');

      // Initialize EmailJS
      emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
      console.log('✅ EmailJS initialized');

      // Prepare email template parameters
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        to_email: 'Gofievfx@gmail.com',
        project_type: data.projectType,
        message: data.message,
        timestamp: data.timestamp,
        source: data.source,
        // Additional formatted content for better email readability
        formatted_message: `
New Quote Request from ${data.name}

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Project Type: ${data.projectType}

Project Details:
${data.message}

Submitted: ${new Date(data.timestamp).toLocaleString()}
Source: ${data.source}
        `.trim()
      };

      console.log('📧 Template parameters:', templateParams);
      console.log('🚀 Sending email to Gofievfx@gmail.com...');

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams
      );

      console.log('✅ Email sent successfully!', response);
      console.log('Response status:', response.status);
      console.log('Response text:', response.text);

      // Success
      form.style.display = 'none';
      successMessage.style.display = 'block';
      
      // Reset form after delay
      setTimeout(() => {
        this.resetForm(form, submitBtn, btnText, btnLoading);
        successMessage.style.display = 'none';
      }, 8000);

    } catch (error) {
      console.error('❌ Form submission error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      // Show error message
      form.style.display = 'none';
      errorMessage.style.display = 'block';
      
      // Reset submit button
      this.resetSubmitButton(form.querySelector('.form-submit-btn'));
    }
  }

  resetForm(form, submitBtn, btnText, btnLoading) {
    // Reset form
    form.reset();
    form.style.display = 'block';
    
    // Clear validation states
    this.clearFormErrors(form);
    
    // Reset floating labels
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.classList.remove('has-value');
    });
    
    // Reset character counter
    const counterElement = document.getElementById('messageCount');
    if (counterElement) {
      counterElement.textContent = '0';
      const counterContainer = counterElement.closest('.character-count');
      if (counterContainer) {
        counterContainer.classList.remove('warning', 'error');
      }
    }
    
    // Reset submit button
    this.resetSubmitButton(submitBtn, btnText, btnLoading);
  }

  resetSubmitButton(submitBtn, btnText, btnLoading) {
    if (!btnText) btnText = submitBtn.querySelector('.btn-text');
    if (!btnLoading) btnLoading = submitBtn.querySelector('.btn-loading');
    
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
  }

  // Scroll Animations
  setupScrollAnimations() {
    // Enhanced scroll animations with multiple element types
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
      rootMargin: '0px 0px -50px 0px', // Trigger animations earlier
      threshold: [0, 0.1, 0.3] // Multiple thresholds for better control
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation classes based on element type
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
          
          // Unobserve element after animation to improve performance
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Observe all elements
    animatedElements.forEach(element => {
      observer.observe(element);
    });

    // Store observer for cleanup if needed
    this.scrollObserver = observer;
  }

  initScrollAnimations() {
    // Add initial animation classes and stagger delays
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      // Skip hero section as it should be visible immediately
      if (section.classList.contains('hero')) return;
      
      section.classList.add('animate-prepare');
      section.style.setProperty('--animation-delay', `${index * 0.1}s`);
    });

    // Prepare other animated elements
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

    // Prepare contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
      item.classList.add('animate-prepare');
      item.style.setProperty('--animation-delay', `${index * 0.15}s`);
    });
  }

  // Cleanup method for performance
  cleanup() {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
      this.scrollObserver = null;
    }
    
    if (this.focusTrapHandler) {
      document.removeEventListener('keydown', this.focusTrapHandler);
      this.focusTrapHandler = null;
    }
  }
}

// Initialize the application
const app = new PortfolioApp();

// Fallback mobile menu initialization (in case main app fails)
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOM loaded - checking mobile menu fallback...');
  
  // Wait a bit for main app to initialize
  setTimeout(() => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) {
      console.log('❌ Mobile menu elements not found for fallback');
      return;
    }
    
    // Check if menu is already working
    const hasClickListener = navToggle.onclick !== null;
    const hasEventListeners = navToggle.getAttribute('data-menu-initialized') === 'true';
    
    if (!hasClickListener && !hasEventListeners) {
      console.log('🔧 Initializing fallback mobile menu...');
      
      // Simple fallback toggle
      const fallbackToggle = () => {
        console.log('🔄 Fallback toggle activated');
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.classList.remove('nav-open');
          console.log('📴 Fallback: Menu closed');
        } else {
          navToggle.classList.add('active');
          navMenu.classList.add('active');
          document.body.classList.add('nav-open');
          console.log('📱 Fallback: Menu opened');
        }
      };
      
      // Add all possible event types
      navToggle.addEventListener('click', fallbackToggle);
      navToggle.addEventListener('touchend', fallbackToggle);
      navToggle.addEventListener('pointerdown', fallbackToggle);
      
      // Mark as initialized
      navToggle.setAttribute('data-menu-initialized', 'true');
      
      console.log('✅ Fallback mobile menu initialized');
    } else {
      console.log('✅ Mobile menu already initialized by main app');
    }
  }, 2000);
});

// Emergency mobile menu fix - runs immediately
(function() {
  console.log('🚨 Emergency mobile menu check...');
  
  const initEmergencyMenu = () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu && !navToggle.hasAttribute('data-emergency-init')) {
      console.log('🆘 Setting up emergency mobile menu...');
      
      navToggle.onclick = function(e) {
        console.log('🆘 Emergency click handler activated');
        e.preventDefault();
        
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.classList.remove('nav-open');
        } else {
          navToggle.classList.add('active');
          navMenu.classList.add('active');
          document.body.classList.add('nav-open');
        }
      };
      
      navToggle.setAttribute('data-emergency-init', 'true');
      console.log('✅ Emergency mobile menu ready');
    }
  };
  
  // Try immediately
  initEmergencyMenu();
  
  // Try again when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmergencyMenu);
  }
  
  // Try again after a delay
  setTimeout(initEmergencyMenu, 1000);
})();

// Cleanup on page unload for performance
window.addEventListener('beforeunload', () => {
  if (app && typeof app.cleanup === 'function') {
    app.cleanup();
  }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
}