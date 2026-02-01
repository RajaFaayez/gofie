/**
 * Slideshow Debug Script
 * 
 * This script helps debug touch/swipe and drag functionality
 * by logging events and providing visual feedback
 */

// Debug logging function
function debugLog(message, data = null) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] 🔍 ${message}`, data || '');
}

// Add debug overlay
function createDebugOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'debug-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-family: monospace;
    font-size: 12px;
    z-index: 10000;
    max-width: 300px;
    pointer-events: none;
  `;
  document.body.appendChild(overlay);
  return overlay;
}

// Update debug info
function updateDebugInfo(info) {
  const overlay = document.getElementById('debug-overlay');
  if (overlay) {
    overlay.innerHTML = `
      <div><strong>Slideshow Debug</strong></div>
      <div>Current Slide: ${info.currentSlide || 0}</div>
      <div>Total Slides: ${info.totalSlides || 0}</div>
      <div>Is Mobile: ${info.isMobile ? 'Yes' : 'No'}</div>
      <div>Is Dragging: ${info.isDragging ? 'Yes' : 'No'}</div>
      <div>Touch Support: ${info.touchSupport ? 'Yes' : 'No'}</div>
      <div>Last Action: ${info.lastAction || 'None'}</div>
    `;
  }
}

// Initialize debugging when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  debugLog('Slideshow debugging initialized');
  
  const debugOverlay = createDebugOverlay();
  const sliderContainer = document.querySelector('.slider-container');
  const sliderTrack = document.getElementById('sliderTrack');
  
  if (!sliderContainer || !sliderTrack) {
    debugLog('❌ Slider elements not found');
    return;
  }
  
  debugLog('✅ Slider elements found');
  
  // Debug info object
  const debugInfo = {
    currentSlide: 0,
    totalSlides: document.querySelectorAll('.slide').length,
    isMobile: window.innerWidth <= 767,
    isDragging: false,
    touchSupport: 'ontouchstart' in window,
    lastAction: 'Initialized'
  };
  
  updateDebugInfo(debugInfo);
  
  // Monitor touch events
  sliderContainer.addEventListener('touchstart', (e) => {
    debugInfo.lastAction = 'Touch Start';
    debugInfo.isDragging = true;
    updateDebugInfo(debugInfo);
    debugLog('👆 Touch start', {
      touches: e.touches.length,
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY
    });
  }, { passive: true });
  
  sliderContainer.addEventListener('touchmove', (e) => {
    debugInfo.lastAction = 'Touch Move';
    updateDebugInfo(debugInfo);
    debugLog('👆 Touch move', {
      touches: e.touches.length,
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY
    });
  }, { passive: true });
  
  sliderContainer.addEventListener('touchend', (e) => {
    debugInfo.lastAction = 'Touch End';
    debugInfo.isDragging = false;
    updateDebugInfo(debugInfo);
    debugLog('👆 Touch end');
  }, { passive: true });
  
  // Monitor mouse events
  sliderContainer.addEventListener('mousedown', (e) => {
    debugInfo.lastAction = 'Mouse Down';
    debugInfo.isDragging = true;
    updateDebugInfo(debugInfo);
    debugLog('🖱️ Mouse down', {
      clientX: e.clientX,
      clientY: e.clientY
    });
  });
  
  document.addEventListener('mousemove', (e) => {
    if (debugInfo.isDragging) {
      debugInfo.lastAction = 'Mouse Move';
      updateDebugInfo(debugInfo);
      debugLog('🖱️ Mouse move', {
        clientX: e.clientX,
        clientY: e.clientY
      });
    }
  });
  
  document.addEventListener('mouseup', (e) => {
    if (debugInfo.isDragging) {
      debugInfo.lastAction = 'Mouse Up';
      debugInfo.isDragging = false;
      updateDebugInfo(debugInfo);
      debugLog('🖱️ Mouse up');
    }
  });
  
  // Monitor slide changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const transform = sliderTrack.style.transform;
        if (transform.includes('translateX')) {
          const match = transform.match(/translateX\((-?\d+(?:\.\d+)?)%\)/);
          if (match) {
            const translatePercent = parseFloat(match[1]);
            const newSlide = Math.abs(translatePercent / 100);
            if (newSlide !== debugInfo.currentSlide) {
              debugInfo.currentSlide = newSlide;
              debugInfo.lastAction = `Slide Changed to ${newSlide}`;
              updateDebugInfo(debugInfo);
              debugLog(`🎯 Slide changed to ${newSlide}`);
            }
          }
        }
      }
    });
  });
  
  observer.observe(sliderTrack, {
    attributes: true,
    attributeFilter: ['style']
  });
  
  // Monitor window resize
  window.addEventListener('resize', () => {
    debugInfo.isMobile = window.innerWidth <= 767;
    debugInfo.lastAction = 'Window Resized';
    updateDebugInfo(debugInfo);
    debugLog('📱 Window resized', {
      width: window.innerWidth,
      isMobile: debugInfo.isMobile
    });
  });
  
  debugLog('🔍 Debug monitoring active');
});