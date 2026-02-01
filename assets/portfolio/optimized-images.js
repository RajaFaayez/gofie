/**
 * Progressive Image Loading for Portfolio
 * Handles WebP detection, lazy loading, and fallbacks
 */
class OptimizedImageLoader {
  constructor() {
    this.supportsWebP = false;
    this.manifest = {
  "version": "1.0.0",
  "generated": "2026-02-01T21:52:37.410Z",
  "images": [
    {
      "id": 1,
      "original": "Source/1.png",
      "webp": "assets/portfolio/webp/1.webp",
      "fallback": "assets/portfolio/fallback/1.jpg",
      "alt": "Portfolio Sample 1",
      "loading": "eager"
    },
    {
      "id": 2,
      "original": "Source/2.png",
      "webp": "assets/portfolio/webp/2.webp",
      "fallback": "assets/portfolio/fallback/2.jpg",
      "alt": "Portfolio Sample 2",
      "loading": "eager"
    },
    {
      "id": 3,
      "original": "Source/3.png",
      "webp": "assets/portfolio/webp/3.webp",
      "fallback": "assets/portfolio/fallback/3.jpg",
      "alt": "Portfolio Sample 3",
      "loading": "eager"
    },
    {
      "id": 4,
      "original": "Source/4.png",
      "webp": "assets/portfolio/webp/4.webp",
      "fallback": "assets/portfolio/fallback/4.jpg",
      "alt": "Portfolio Sample 4",
      "loading": "lazy"
    },
    {
      "id": 5,
      "original": "Source/5.png",
      "webp": "assets/portfolio/webp/5.webp",
      "fallback": "assets/portfolio/fallback/5.jpg",
      "alt": "Portfolio Sample 5",
      "loading": "lazy"
    },
    {
      "id": 6,
      "original": "Source/6.png",
      "webp": "assets/portfolio/webp/6.webp",
      "fallback": "assets/portfolio/fallback/6.jpg",
      "alt": "Portfolio Sample 6",
      "loading": "lazy"
    },
    {
      "id": 7,
      "original": "Source/7.png",
      "webp": "assets/portfolio/webp/7.webp",
      "fallback": "assets/portfolio/fallback/7.jpg",
      "alt": "Portfolio Sample 7",
      "loading": "lazy"
    },
    {
      "id": 8,
      "original": "Source/8.png",
      "webp": "assets/portfolio/webp/8.webp",
      "fallback": "assets/portfolio/fallback/8.jpg",
      "alt": "Portfolio Sample 8",
      "loading": "lazy"
    },
    {
      "id": 9,
      "original": "Source/9.png",
      "webp": "assets/portfolio/webp/9.webp",
      "fallback": "assets/portfolio/fallback/9.jpg",
      "alt": "Portfolio Sample 9",
      "loading": "lazy"
    },
    {
      "id": 10,
      "original": "Source/10.png",
      "webp": "assets/portfolio/webp/10.webp",
      "fallback": "assets/portfolio/fallback/10.jpg",
      "alt": "Portfolio Sample 10",
      "loading": "lazy"
    },
    {
      "id": 11,
      "original": "Source/11.png",
      "webp": "assets/portfolio/webp/11.webp",
      "fallback": "assets/portfolio/fallback/11.jpg",
      "alt": "Portfolio Sample 11",
      "loading": "lazy"
    }
  ]
};
    this.init();
  }

  async init() {
    // Detect WebP support
    this.supportsWebP = await this.detectWebPSupport();
    
    // Add class to document for CSS targeting
    document.documentElement.classList.add(
      this.supportsWebP ? 'webp' : 'no-webp'
    );
    
    // Initialize image loading
    this.loadImages();
    
    console.log('✅ Image loader initialized (WebP: ' + this.supportsWebP + ')');
  }

  detectWebPSupport() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  loadImages() {
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide, index) => {
      const img = slide.querySelector('img');
      if (!img || !this.manifest.images[index]) return;

      const imageData = this.manifest.images[index];
      const imageSrc = this.supportsWebP ? imageData.webp : imageData.fallback;
      
      // Set up progressive loading
      this.loadImageProgressively(img, imageSrc, imageData);
    });
  }

  loadImageProgressively(img, src, imageData) {
    // Create new image for preloading
    const preloadImg = new Image();
    
    preloadImg.onload = () => {
      // Image loaded successfully
      img.src = src;
      img.alt = imageData.alt;
      img.classList.add('loaded');
      
      // Remove loading placeholder
      img.style.backgroundImage = 'none';
    };
    
    preloadImg.onerror = () => {
      // Fallback to original if optimized version fails
      console.warn('Failed to load optimized image: ' + src);
      img.src = imageData.original;
      img.alt = imageData.alt;
      img.classList.add('loaded');
    };
    
    // Start loading
    preloadImg.src = src;
  }

  // Method to preload next images for better UX
  preloadNextImages(currentIndex, count = 2) {
    const startIndex = Math.max(0, currentIndex - 1);
    const endIndex = Math.min(this.manifest.images.length, currentIndex + count + 1);
    
    for (let i = startIndex; i < endIndex; i++) {
      if (i === currentIndex) continue;
      
      const imageData = this.manifest.images[i];
      if (!imageData) continue;
      
      const src = this.supportsWebP ? imageData.webp : imageData.fallback;
      const preloadImg = new Image();
      preloadImg.src = src;
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.optimizedImageLoader = new OptimizedImageLoader();
  });
} else {
  window.optimizedImageLoader = new OptimizedImageLoader();
}