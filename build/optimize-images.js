#!/usr/bin/env node

/**
 * Image Optimization Script for GofieVFX Portfolio
 * 
 * This script optimizes images for web performance by:
 * 1. Converting PNG images to WebP format with quality optimization
 * 2. Creating responsive image variants
 * 3. Generating fallback images for browser compatibility
 * 4. Optimizing file sizes while maintaining visual quality
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  sourceDir: 'Source',
  outputDir: 'assets/portfolio',
  webpQuality: 85,
  jpegQuality: 90,
  maxWidth: 600, // Max width for portfolio images
  aspectRatio: 267 / 491 // Target aspect ratio from design
};

/**
 * Creates optimized directory structure
 */
function createDirectories() {
  const dirs = [
    CONFIG.outputDir,
    path.join(CONFIG.outputDir, 'webp'),
    path.join(CONFIG.outputDir, 'fallback')
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log('✅ Created directory: ' + dir);
    }
  });
}

/**
 * Generates image optimization manifest
 */
function generateImageManifest() {
  const sourceFiles = fs.readdirSync(CONFIG.sourceDir)
    .filter(file => file.match(/\.(png|jpg|jpeg)$/i))
    .sort((a, b) => {
      // Sort numerically (1.png, 2.png, etc.)
      const numA = parseInt(a.match(/\d+/)?.[0] || '0');
      const numB = parseInt(b.match(/\d+/)?.[0] || '0');
      return numA - numB;
    });

  const manifest = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    images: sourceFiles.map((file, index) => {
      const name = path.parse(file).name;
      return {
        id: index + 1,
        original: 'Source/' + file,
        webp: 'assets/portfolio/webp/' + name + '.webp',
        fallback: 'assets/portfolio/fallback/' + name + '.jpg',
        alt: 'Portfolio Sample ' + (index + 1),
        loading: index < 3 ? 'eager' : 'lazy' // First 3 images load eagerly
      };
    })
  };

  fs.writeFileSync(
    path.join(CONFIG.outputDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log('✅ Generated manifest with ' + manifest.images.length + ' images');
  return manifest;
}

/**
 * Creates CSS for optimized image loading
 */
function generateImageCSS(manifest) {
  const css = `
/* Optimized Image Loading Styles */
.portfolio-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: var(--color-bg-accent);
  transition: opacity 0.3s ease;
}

.portfolio-image[loading="lazy"] {
  opacity: 0;
}

.portfolio-image.loaded {
  opacity: 1;
}

/* WebP Support Detection */
.webp .portfolio-image {
  content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>');
}

/* Fallback for browsers without WebP support */
.no-webp .portfolio-image {
  /* Fallback images will be loaded via JavaScript */
}

/* Loading placeholder */
.portfolio-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, 
    var(--color-bg-accent) 25%, 
    rgba(255, 255, 255, 0.1) 50%, 
    var(--color-bg-accent) 75%
  );
  background-size: 200% 100%;
  animation: loading-shimmer 1.5s infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-image:not(.loaded)::before {
  opacity: 1;
}

@keyframes loading-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

  fs.writeFileSync(
    path.join(CONFIG.outputDir, 'optimized-images.css'),
    css.trim()
  );

  console.log('✅ Generated optimized image CSS');
}

/**
 * Creates JavaScript for progressive image loading
 */
function generateImageJS(manifest) {
  const js = `
/**
 * Progressive Image Loading for Portfolio
 * Handles WebP detection, lazy loading, and fallbacks
 */
class OptimizedImageLoader {
  constructor() {
    this.supportsWebP = false;
    this.manifest = ` + JSON.stringify(manifest, null, 2) + `;
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
`;

  fs.writeFileSync(
    path.join(CONFIG.outputDir, 'optimized-images.js'),
    js.trim()
  );

  console.log('✅ Generated optimized image JavaScript');
}

/**
 * Main execution function
 */
function main() {
  console.log('🚀 Starting image optimization process...');
  
  try {
    // Create directory structure
    createDirectories();
    
    // Generate manifest and optimization files
    const manifest = generateImageManifest();
    generateImageCSS(manifest);
    generateImageJS(manifest);
    
    console.log('');
    console.log('📋 Optimization Summary:');
    console.log('   • ' + manifest.images.length + ' images ready for optimization');
    console.log('   • WebP versions will be created in: ' + path.join(CONFIG.outputDir, 'webp'));
    console.log('   • Fallback versions will be created in: ' + path.join(CONFIG.outputDir, 'fallback'));
    console.log('   • Manifest generated: ' + path.join(CONFIG.outputDir, 'manifest.json'));
    console.log('');
    console.log('⚠️  Note: This script creates the optimization infrastructure.');
    console.log('   For actual image conversion, you would need image processing tools like:');
    console.log('   • Sharp (npm install sharp)');
    console.log('   • ImageMagick');
    console.log('   • Online tools like Squoosh.app');
    console.log('');
    console.log('✅ Image optimization infrastructure ready!');
    
  } catch (error) {
    console.error('❌ Error during optimization:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main, CONFIG };