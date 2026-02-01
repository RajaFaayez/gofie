// Test setup for GofieVFX Portfolio
// This file runs before each test file

// Mock window.scrollTo for testing
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn(cb => setTimeout(cb, 0));
global.cancelAnimationFrame = vi.fn();

// Setup DOM environment
beforeEach(() => {
  document.body.innerHTML = '';
  vi.clearAllMocks();
});