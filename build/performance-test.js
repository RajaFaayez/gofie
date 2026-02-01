#!/usr/bin/env node

/**
 * Performance Testing Script for GofieVFX Portfolio
 * 
 * Tests and measures:
 * 1. Page load times and resource loading
 * 2. Image optimization effectiveness
 * 3. CSS and JavaScript minification impact
 * 4. Lazy loading performance
 * 5. Core Web Vitals simulation
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  testFiles: {
    original: {
      html: 'index.html',
      css: 'styles/main.css',
      js: 'js/main.js'
    },
    optimized: {
      html: 'dist/index.html',
      css: 'dist/css/main.min.css',
      js: 'dist/js/main.min.js'
    }
  },
  thresholds: {
    // Performance thresholds based on requirements
    maxLoadTime: 3000, // 3 seconds (Requirement 15.3)
    maxCSSSize: 50000, // 50KB
    maxJSSize: 60000,  // 60KB
    minCompressionRatio: 0.2 // 20% minimum compression
  }
};

/**
 * Analyzes file sizes and compression
 */
function analyzeFileSizes() {
  console.log('📊 Analyzing file sizes and compression...');
  
  const results = {
    original: {},
    optimized: {},
    compression: {}
  };
  
  // Analyze original files
  Object.entries(CONFIG.testFiles.original).forEach(([type, filePath]) => {
    try {
      const stats = fs.statSync(filePath);
      results.original[type] = {
        path: filePath,
        size: stats.size,
        exists: true
      };
      console.log('  📄 Original ' + type + ': ' + stats.size + ' bytes (' + filePath + ')');
    } catch (error) {
      results.original[type] = {
        path: filePath,
        size: 0,
        exists: false,
        error: error.message
      };
      console.warn('  ⚠️  Could not read ' + filePath + ': ' + error.message);
    }
  });
  
  // Analyze optimized files
  Object.entries(CONFIG.testFiles.optimized).forEach(([type, filePath]) => {
    try {
      const stats = fs.statSync(filePath);
      results.optimized[type] = {
        path: filePath,
        size: stats.size,
        exists: true
      };
      console.log('  📄 Optimized ' + type + ': ' + stats.size + ' bytes (' + filePath + ')');
    } catch (error) {
      results.optimized[type] = {
        path: filePath,
        size: 0,
        exists: false,
        error: error.message
      };
      console.warn('  ⚠️  Could not read ' + filePath + ': ' + error.message);
    }
  });
  
  // Calculate compression ratios
  Object.keys(CONFIG.testFiles.original).forEach(type => {
    const original = results.original[type];
    const optimized = results.optimized[type];
    
    if (original.exists && optimized.exists && original.size > 0) {
      const compressionRatio = (original.size - optimized.size) / original.size;
      const savings = original.size - optimized.size;
      
      results.compression[type] = {
        ratio: compressionRatio,
        savings: savings,
        percentage: (compressionRatio * 100).toFixed(1)
      };
      
      console.log('  💾 ' + type + ' compression: ' + savings + ' bytes saved (' + results.compression[type].percentage + '%)');
    }
  });
  
  return results;
}

/**
 * Tests image optimization
 */
function testImageOptimization() {
  console.log('🖼️  Testing image optimization...');
  
  const results = {
    sourceImages: [],
    optimizedImages: [],
    totalSavings: 0
  };
  
  // Check source images
  try {
    const sourceFiles = fs.readdirSync('Source')
      .filter(file => file.match(/\.(png|jpg|jpeg)$/i));
    
    sourceFiles.forEach(file => {
      const filePath = path.join('Source', file);
      const stats = fs.statSync(filePath);
      
      results.sourceImages.push({
        name: file,
        path: filePath,
        size: stats.size
      });
    });
    
    console.log('  📸 Found ' + results.sourceImages.length + ' source images');
    
  } catch (error) {
    console.warn('  ⚠️  Could not read source images: ' + error.message);
  }
  
  // Check for optimized images
  const webpDir = 'assets/portfolio/webp';
  const fallbackDir = 'assets/portfolio/fallback';
  
  [webpDir, fallbackDir].forEach(dir => {
    try {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        console.log('  📁 ' + dir + ': ' + files.length + ' files');
        
        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stats = fs.statSync(filePath);
          
          results.optimizedImages.push({
            name: file,
            path: filePath,
            size: stats.size,
            type: dir.includes('webp') ? 'webp' : 'fallback'
          });
        });
      } else {
        console.log('  📁 ' + dir + ': Directory not found (optimization not run)');
      }
    } catch (error) {
      console.warn('  ⚠️  Could not read ' + dir + ': ' + error.message);
    }
  });
  
  return results;
}

/**
 * Simulates loading performance
 */
function simulateLoadingPerformance() {
  console.log('⚡ Simulating loading performance...');
  
  const results = {
    originalBundle: 0,
    optimizedBundle: 0,
    estimatedLoadTime: {
      original: 0,
      optimized: 0
    },
    networkSpeeds: {
      '3G': 1.6, // Mbps
      '4G': 10,  // Mbps
      'WiFi': 50 // Mbps
    }
  };
  
  // Calculate bundle sizes
  Object.values(CONFIG.testFiles.original).forEach(filePath => {
    try {
      const stats = fs.statSync(filePath);
      results.originalBundle += stats.size;
    } catch (error) {
      // File doesn't exist, skip
    }
  });
  
  Object.values(CONFIG.testFiles.optimized).forEach(filePath => {
    try {
      const stats = fs.statSync(filePath);
      results.optimizedBundle += stats.size;
    } catch (error) {
      // File doesn't exist, skip
    }
  });
  
  // Calculate estimated load times for different network speeds
  Object.entries(results.networkSpeeds).forEach(([network, speedMbps]) => {
    const speedBytesPerSecond = (speedMbps * 1024 * 1024) / 8; // Convert to bytes per second
    
    const originalTime = (results.originalBundle / speedBytesPerSecond) * 1000; // milliseconds
    const optimizedTime = (results.optimizedBundle / speedBytesPerSecond) * 1000; // milliseconds
    
    results.estimatedLoadTime[network] = {
      original: Math.round(originalTime),
      optimized: Math.round(optimizedTime),
      improvement: Math.round(originalTime - optimizedTime)
    };
    
    console.log('  📶 ' + network + ' (' + speedMbps + ' Mbps):');
    console.log('     Original: ' + results.estimatedLoadTime[network].original + 'ms');
    console.log('     Optimized: ' + results.estimatedLoadTime[network].optimized + 'ms');
    console.log('     Improvement: ' + results.estimatedLoadTime[network].improvement + 'ms');
  });
  
  return results;
}

/**
 * Checks lazy loading implementation
 */
function checkLazyLoading() {
  console.log('🔄 Checking lazy loading implementation...');
  
  const results = {
    lazyLoadingScript: false,
    lazyImages: 0,
    lazyVideos: 0,
    lazyContent: 0
  };
  
  // Check if lazy loading script exists
  try {
    fs.statSync('js/lazy-loading.js');
    results.lazyLoadingScript = true;
    console.log('  ✅ Lazy loading script found');
  } catch (error) {
    console.log('  ❌ Lazy loading script not found');
  }
  
  // Check HTML for lazy loading attributes
  try {
    const html = fs.readFileSync('index.html', 'utf8');
    
    // Count lazy loading attributes
    const lazyImages = (html.match(/loading="lazy"/g) || []).length;
    const lazyVideos = (html.match(/preload="metadata"/g) || []).length;
    const lazyContent = (html.match(/data-lazy-content/g) || []).length;
    
    results.lazyImages = lazyImages;
    results.lazyVideos = lazyVideos;
    results.lazyContent = lazyContent;
    
    console.log('  📸 Images with lazy loading: ' + lazyImages);
    console.log('  🎥 Videos with lazy loading: ' + lazyVideos);
    console.log('  📄 Content sections with lazy loading: ' + lazyContent);
    
  } catch (error) {
    console.warn('  ⚠️  Could not analyze HTML: ' + error.message);
  }
  
  return results;
}

/**
 * Validates performance against requirements
 */
function validatePerformance(analysisResults, loadingResults) {
  console.log('✅ Validating performance against requirements...');
  
  const validation = {
    passed: 0,
    failed: 0,
    tests: []
  };
  
  // Test 1: CSS file size
  const cssSize = analysisResults.optimized.css ? analysisResults.optimized.css.size : 0;
  const cssTest = {
    name: 'CSS file size under threshold',
    threshold: CONFIG.thresholds.maxCSSSize,
    actual: cssSize,
    passed: cssSize <= CONFIG.thresholds.maxCSSSize && cssSize > 0
  };
  validation.tests.push(cssTest);
  
  // Test 2: JavaScript file size
  const jsSize = analysisResults.optimized.js ? analysisResults.optimized.js.size : 0;
  const jsTest = {
    name: 'JavaScript file size under threshold',
    threshold: CONFIG.thresholds.maxJSSize,
    actual: jsSize,
    passed: jsSize <= CONFIG.thresholds.maxJSSize && jsSize > 0
  };
  validation.tests.push(jsTest);
  
  // Test 3: Compression ratio
  const cssCompression = analysisResults.compression.css ? analysisResults.compression.css.ratio : 0;
  const compressionTest = {
    name: 'Minimum compression ratio achieved',
    threshold: CONFIG.thresholds.minCompressionRatio,
    actual: cssCompression,
    passed: cssCompression >= CONFIG.thresholds.minCompressionRatio
  };
  validation.tests.push(compressionTest);
  
  // Test 4: Estimated load time on 3G
  const loadTime3G = loadingResults.estimatedLoadTime['3G'] ? loadingResults.estimatedLoadTime['3G'].optimized : 0;
  const loadTimeTest = {
    name: 'Load time under 3 seconds on 3G',
    threshold: CONFIG.thresholds.maxLoadTime,
    actual: loadTime3G,
    passed: loadTime3G <= CONFIG.thresholds.maxLoadTime && loadTime3G > 0
  };
  validation.tests.push(loadTimeTest);
  
  // Count results
  validation.tests.forEach(test => {
    if (test.passed) {
      validation.passed++;
      console.log('  ✅ ' + test.name + ': ' + test.actual + ' (threshold: ' + test.threshold + ')');
    } else {
      validation.failed++;
      console.log('  ❌ ' + test.name + ': ' + test.actual + ' (threshold: ' + test.threshold + ')');
    }
  });
  
  return validation;
}

/**
 * Generates comprehensive performance report
 */
function generateReport(analysisResults, imageResults, loadingResults, lazyResults, validation) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: validation.tests.length,
      passed: validation.passed,
      failed: validation.failed,
      score: Math.round((validation.passed / validation.tests.length) * 100)
    },
    fileSizes: analysisResults,
    images: imageResults,
    loading: loadingResults,
    lazyLoading: lazyResults,
    validation: validation,
    recommendations: []
  };
  
  // Generate recommendations
  if (validation.failed > 0) {
    validation.tests.forEach(test => {
      if (!test.passed) {
        switch (test.name) {
          case 'CSS file size under threshold':
            report.recommendations.push('Consider further CSS optimization or splitting into critical/non-critical parts');
            break;
          case 'JavaScript file size under threshold':
            report.recommendations.push('Consider code splitting or removing unused JavaScript');
            break;
          case 'Minimum compression ratio achieved':
            report.recommendations.push('Improve minification process or remove unnecessary code');
            break;
          case 'Load time under 3 seconds on 3G':
            report.recommendations.push('Implement more aggressive optimization or lazy loading');
            break;
        }
      }
    });
  } else {
    report.recommendations.push('All performance tests passed! Consider implementing additional optimizations for even better performance.');
  }
  
  // Save report
  fs.writeFileSync('performance-test-report.json', JSON.stringify(report, null, 2));
  
  return report;
}

/**
 * Main execution function
 */
function main() {
  console.log('🚀 Starting performance testing...');
  console.log('');
  
  try {
    // Run all tests
    const analysisResults = analyzeFileSizes();
    console.log('');
    
    const imageResults = testImageOptimization();
    console.log('');
    
    const loadingResults = simulateLoadingPerformance();
    console.log('');
    
    const lazyResults = checkLazyLoading();
    console.log('');
    
    const validation = validatePerformance(analysisResults, loadingResults);
    console.log('');
    
    // Generate final report
    const report = generateReport(analysisResults, imageResults, loadingResults, lazyResults, validation);
    
    console.log('📋 Performance Test Summary:');
    console.log('   Score: ' + report.summary.score + '% (' + report.summary.passed + '/' + report.summary.totalTests + ' tests passed)');
    console.log('   Report saved: performance-test-report.json');
    console.log('');
    
    if (report.recommendations.length > 0) {
      console.log('💡 Recommendations:');
      report.recommendations.forEach(rec => {
        console.log('   • ' + rec);
      });
      console.log('');
    }
    
    if (report.summary.score >= 75) {
      console.log('✅ Performance optimization successful!');
    } else {
      console.log('⚠️  Performance needs improvement. Check recommendations above.');
    }
    
  } catch (error) {
    console.error('❌ Error during performance testing:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main, CONFIG };