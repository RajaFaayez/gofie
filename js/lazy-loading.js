/**
 * Lazy Loading Implementation for GofieVFX Portfolio
 * 
 * Implements progressive loading for below-the-fold content:
 * 1. Images in portfolio slider
 * 2. Video content in about section
 * 3. Heavy animations and effects
 * 4. Non-critical CSS and JavaScript
 */

class LazyLoader {
  constructor() {
    this.observers = new Map();
    this.loadedElements = new Set();
    this.init();
  }

  init() {
    // Initialize different types of lazy loading
    this.setupImageLazyLoading();
    this.setupVideoLazyLoading();
    this.setupAnimationLazyLoading();
    this.setupContentLazyLoading();
    
    console.log('✅ Lazy loading initialized');
  }

  /**
   * Lazy load images in portfolio slider
   */
  setupImageLazyLoading() {
    const images = document.querySelectorAll('.slide img[loading="lazy"]');
    
    if (!images.length) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px', // Start loading 50px before entering viewport
      threshold: 0.1
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });

    this.observers.set('images', imageObserver);
    console.log('📸 Image lazy loading setup for', images.length, 'images');
  }

  /**
   * Load individual image with fallback handling
   */
  loadImage(img) {
    if (this.loadedElements.has(img)) return;

    const originalSrc = img.src;
    const dataSrc = img.dataset.src || originalSrc;
    
    // Create a new image to preload
    const preloadImg = new Image();
    
    preloadImg.onload = () => {
      img.src = dataSrc;
      img.classList.add('loaded');
      this.loadedElements.add(img);
      
      // Trigger any custom events
      img.dispatchEvent(new CustomEvent('lazyloaded'));
    };
    
    preloadImg.onerror = () => {
      console.warn('Failed to lazy load image:', dataSrc);
      img.classList.add('error');
      
      // Try fallback if available
      if (img.dataset.fallback) {
        img.src = img.dataset.fallback;
      }
    };
    
    preloadImg.src = dataSrc;
  }

  /**
   * Lazy load video content
   */
  setupVideoLazyLoading() {
    const videos = document.querySelectorAll('video[preload="metadata"]');
    
    if (!videos.length) return;

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          this.loadVideo(video);
          videoObserver.unobserve(video);
        }
      });
    }, {
      rootMargin: '100px 0px', // Start loading 100px before entering viewport
      threshold: 0.1
    });

    videos.forEach(video => {
      videoObserver.observe(video);
    });

    this.observers.set('videos', videoObserver);
    console.log('🎥 Video lazy loading setup for', videos.length, 'videos');
  }

  /**
   * Load video with progressive enhancement
   */
  loadVideo(video) {
    if (this.loadedElements.has(video)) return;

    // Change preload to auto to start loading
    video.preload = 'auto';
    
    // Add loading class for styling
    video.classList.add('loading');
    
    const handleLoad = () => {
      video.classList.remove('loading');
      video.classList.add('loaded');
      this.loadedElements.add(video);
      
      video.removeEventListener('loadeddata', handleLoad);
      video.removeEventListener('error', handleError);
    };
    
    const handleError = () => {
      video.classList.remove('loading');
      video.classList.add('error');
      
      console.warn('Failed to load video:', video.src);
      
      video.removeEventListener('loadeddata', handleLoad);
      video.removeEventListener('error', handleError);
    };
    
    video.addEventListener('loadeddata', handleLoad);
    video.addEventListener('error', handleError);
    
    // Force load if not already loading
    if (video.readyState < 2) {
      video.load();
    }
  }

  /**
   * Lazy load animations and effects
   */
  setupAnimationLazyLoading() {
    const animatedElements = document.querySelectorAll('.animate-prepare');
    
    if (!animatedElements.length) return;

    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          this.triggerAnimation(element);
          animationObserver.unobserve(element);
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px', // Trigger when 10% visible
      threshold: 0.1
    });

    animatedElements.forEach(element => {
      animationObserver.observe(element);
    });

    this.observers.set('animations', animationObserver);
    console.log('✨ Animation lazy loading setup for', animatedElements.length, 'elements');
  }

  /**
   * Trigger animation for element
   */
  triggerAnimation(element) {
    if (this.loadedElements.has(element)) return;

    // Remove prepare class and add appropriate animation class
    element.classList.remove('animate-prepare');
    
    // Determine animation type based on element
    if (element.tagName === 'SECTION') {
      element.classList.add('animate-fade-in');
    } else if (element.classList.contains('tool-card') || 
               element.classList.contains('benefit-item')) {
      element.classList.add('animate-slide-up');
    } else if (element.matches('.services-list li, .plugins-list li')) {
      element.classList.add('animate-slide-in-left');
    } else if (element.classList.contains('results-statement')) {
      element.classList.add('animate-scale-in');
    } else {
      element.classList.add('animate-fade-in');
    }
    
    this.loadedElements.add(element);
  }

  /**
   * Lazy load non-critical content sections
   */
  setupContentLazyLoading() {
    const contentSections = document.querySelectorAll('[data-lazy-content]');
    
    if (!contentSections.length) return;

    const contentObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          this.loadContent(section);
          contentObserver.unobserve(section);
        }
      });
    }, {
      rootMargin: '200px 0px', // Start loading 200px before entering viewport
      threshold: 0
    });

    contentSections.forEach(section => {
      contentObserver.observe(section);
    });

    this.observers.set('content', contentObserver);
    console.log('📄 Content lazy loading setup for', contentSections.length, 'sections');
  }

  /**
   * Load content for section
   */
  loadContent(section) {
    if (this.loadedElements.has(section)) return;

    const contentType = section.dataset.lazyContent;
    
    switch (contentType) {
      case 'portfolio':
        this.loadPortfolioContent(section);
        break;
      case 'contact':
        this.loadContactContent(section);
        break;
      case 'tools':
        this.loadToolsContent(section);
        break;
      default:
        console.warn('Unknown content type:', contentType);
    }
    
    this.loadedElements.add(section);
  }

  /**
   * Load portfolio-specific content
   */
  loadPortfolioContent(section) {
    // Initialize portfolio slider if not already done
    if (window.app && typeof window.app.initPortfolioSlider === 'function') {
      window.app.initPortfolioSlider();
    }
    
    // Load optimized images if available
    if (window.optimizedImageLoader) {
      window.optimizedImageLoader.loadImages();
    }
    
    section.classList.add('content-loaded');
  }

  /**
   * Load contact form enhancements
   */
  loadContactContent(section) {
    // Initialize enhanced form validation
    const form = section.querySelector('form');
    if (form && window.app && typeof window.app.setupContactForm === 'function') {
      window.app.setupContactForm();
    }
    
    section.classList.add('content-loaded');
  }

  /**
   * Load tools section enhancements
   */
  loadToolsContent(section) {
    // Add hover effects and animations
    const toolCards = section.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
      card.classList.add('enhanced');
    });
    
    section.classList.add('content-loaded');
  }

  /**
   * Preload critical resources
   */
  preloadCriticalResources() {
    const criticalImages = [
      'Source/1.png', // First portfolio image
      'Source/2.png', // Second portfolio image
      'Source/3.png'  // Third portfolio image
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
    
    console.log('🚀 Preloaded', criticalImages.length, 'critical images');
  }

  /**
   * Get loading statistics
   */
  getStats() {
    return {
      totalObservers: this.observers.size,
      loadedElements: this.loadedElements.size,
      observers: Array.from(this.observers.keys())
    };
  }

  /**
   * Cleanup observers
   */
  cleanup() {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();
    this.loadedElements.clear();
    
    console.log('🧹 Lazy loading cleanup complete');
  }
}

// Initialize lazy loading when DOM is ready
let lazyLoader;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    lazyLoader = new LazyLoader();
    lazyLoader.preloadCriticalResources();
  });
} else {
  lazyLoader = new LazyLoader();
  lazyLoader.preloadCriticalResources();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (lazyLoader && typeof lazyLoader.cleanup === 'function') {
    lazyLoader.cleanup();
  }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LazyLoader;
}

// Make available globally
window.LazyLoader = LazyLoader;
window.lazyLoader = lazyLoader;