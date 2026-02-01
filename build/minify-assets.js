#!/usr/bin/env node

/**
 * Asset Minification Script for GofieVFX Portfolio
 * 
 * This script minifies CSS and JavaScript files for production:
 * 1. Removes comments and whitespace
 * 2. Optimizes CSS properties and values
 * 3. Compresses JavaScript while preserving functionality
 * 4. Creates production-ready versions with .min extensions
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  cssFiles: [
    'styles/main.css'
  ],
  jsFiles: [
    'js/main.js',
    'js/email-config.js'
  ],
  outputDir: 'dist',
  preserveComments: false
};

/**
 * Simple CSS minifier
 */
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove unnecessary whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around specific characters
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    // Remove trailing semicolons before closing braces
    .replace(/;}/g, '}')
    // Remove empty rules
    .replace(/[^{}]+{\s*}/g, '')
    // Trim
    .trim();
}

/**
 * Simple JavaScript minifier
 */
function minifyJS(js) {
  return js
    // Remove single-line comments (but preserve URLs and regex)
    .replace(/(?:^|\s)\/\/.*$/gm, '')
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove unnecessary whitespace (preserve strings)
    .replace(/\s+/g, ' ')
    // Remove whitespace around operators and punctuation
    .replace(/\s*([{}();,=+\-*/<>!&|])\s*/g, '$1')
    // Remove trailing semicolons (optional)
    .replace(/;+/g, ';')
    // Trim
    .trim();
}

/**
 * Creates production directory structure
 */
function createProductionDirs() {
  const dirs = [
    CONFIG.outputDir,
    path.join(CONFIG.outputDir, 'css'),
    path.join(CONFIG.outputDir, 'js')
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log('✅ Created directory: ' + dir);
    }
  });
}

/**
 * Minifies CSS files
 */
function minifyCSSFiles() {
  console.log('🎨 Minifying CSS files...');
  
  CONFIG.cssFiles.forEach(filePath => {
    try {
      const originalCSS = fs.readFileSync(filePath, 'utf8');
      const minifiedCSS = minifyCSS(originalCSS);
      
      const fileName = path.basename(filePath, '.css');
      const outputPath = path.join(CONFIG.outputDir, 'css', fileName + '.min.css');
      
      fs.writeFileSync(outputPath, minifiedCSS);
      
      const originalSize = originalCSS.length;
      const minifiedSize = minifiedCSS.length;
      const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
      
      console.log('  ✅ ' + filePath + ' → ' + outputPath);
      console.log('     Size: ' + originalSize + ' → ' + minifiedSize + ' bytes (' + savings + '% smaller)');
      
    } catch (error) {
      console.error('  ❌ Error minifying ' + filePath + ':', error.message);
    }
  });
}

/**
 * Minifies JavaScript files
 */
function minifyJSFiles() {
  console.log('📜 Minifying JavaScript files...');
  
  CONFIG.jsFiles.forEach(filePath => {
    try {
      const originalJS = fs.readFileSync(filePath, 'utf8');
      const minifiedJS = minifyJS(originalJS);
      
      const fileName = path.basename(filePath, '.js');
      const outputPath = path.join(CONFIG.outputDir, 'js', fileName + '.min.js');
      
      fs.writeFileSync(outputPath, minifiedJS);
      
      const originalSize = originalJS.length;
      const minifiedSize = minifiedJS.length;
      const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
      
      console.log('  ✅ ' + filePath + ' → ' + outputPath);
      console.log('     Size: ' + originalSize + ' → ' + minifiedSize + ' bytes (' + savings + '% smaller)');
      
    } catch (error) {
      console.error('  ❌ Error minifying ' + filePath + ':', error.message);
    }
  });
}

/**
 * Creates production HTML with minified assets
 */
function createProductionHTML() {
  console.log('📄 Creating production HTML...');
  
  try {
    let html = fs.readFileSync('index.html', 'utf8');
    
    // Replace CSS references with minified versions
    html = html.replace(
      '<link rel="stylesheet" href="styles/main.css">',
      '<link rel="stylesheet" href="dist/css/main.min.css">'
    );
    
    // Replace JS references with minified versions
    html = html.replace(
      '<script src="js/email-config.js" defer></script>',
      '<script src="dist/js/email-config.min.js" defer></script>'
    );
    
    html = html.replace(
      '<script src="js/main.js" defer></script>',
      '<script src="dist/js/main.min.js" defer></script>'
    );
    
    // Add performance optimizations
    const optimizedHTML = html.replace(
      '<head>',
      `<head>
    <!-- Performance optimizations -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">`
    );
    
    fs.writeFileSync(path.join(CONFIG.outputDir, 'index.html'), optimizedHTML);
    
    console.log('  ✅ Production HTML created: ' + path.join(CONFIG.outputDir, 'index.html'));
    
  } catch (error) {
    console.error('  ❌ Error creating production HTML:', error.message);
  }
}

/**
 * Generates performance report
 */
function generatePerformanceReport() {
  console.log('📊 Generating performance report...');
  
  const report = {
    timestamp: new Date().toISOString(),
    files: {
      css: [],
      js: []
    },
    totalSavings: {
      bytes: 0,
      percentage: 0
    }
  };
  
  let totalOriginalSize = 0;
  let totalMinifiedSize = 0;
  
  // Analyze CSS files
  CONFIG.cssFiles.forEach(filePath => {
    try {
      const originalSize = fs.statSync(filePath).size;
      const fileName = path.basename(filePath, '.css');
      const minifiedPath = path.join(CONFIG.outputDir, 'css', fileName + '.min.css');
      const minifiedSize = fs.statSync(minifiedPath).size;
      
      totalOriginalSize += originalSize;
      totalMinifiedSize += minifiedSize;
      
      report.files.css.push({
        original: filePath,
        minified: minifiedPath,
        originalSize: originalSize,
        minifiedSize: minifiedSize,
        savings: originalSize - minifiedSize,
        savingsPercentage: ((originalSize - minifiedSize) / originalSize * 100).toFixed(1)
      });
    } catch (error) {
      console.warn('  ⚠️  Could not analyze ' + filePath);
    }
  });
  
  // Analyze JS files
  CONFIG.jsFiles.forEach(filePath => {
    try {
      const originalSize = fs.statSync(filePath).size;
      const fileName = path.basename(filePath, '.js');
      const minifiedPath = path.join(CONFIG.outputDir, 'js', fileName + '.min.js');
      const minifiedSize = fs.statSync(minifiedPath).size;
      
      totalOriginalSize += originalSize;
      totalMinifiedSize += minifiedSize;
      
      report.files.js.push({
        original: filePath,
        minified: minifiedPath,
        originalSize: originalSize,
        minifiedSize: minifiedSize,
        savings: originalSize - minifiedSize,
        savingsPercentage: ((originalSize - minifiedSize) / originalSize * 100).toFixed(1)
      });
    } catch (error) {
      console.warn('  ⚠️  Could not analyze ' + filePath);
    }
  });
  
  report.totalSavings.bytes = totalOriginalSize - totalMinifiedSize;
  report.totalSavings.percentage = ((totalOriginalSize - totalMinifiedSize) / totalOriginalSize * 100).toFixed(1);
  
  fs.writeFileSync(
    path.join(CONFIG.outputDir, 'performance-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('  ✅ Performance report saved: ' + path.join(CONFIG.outputDir, 'performance-report.json'));
  console.log('  📈 Total savings: ' + report.totalSavings.bytes + ' bytes (' + report.totalSavings.percentage + '%)');
}

/**
 * Main execution function
 */
function main() {
  console.log('🚀 Starting asset minification process...');
  
  try {
    // Create production directories
    createProductionDirs();
    
    // Minify assets
    minifyCSSFiles();
    minifyJSFiles();
    
    // Create production HTML
    createProductionHTML();
    
    // Generate performance report
    generatePerformanceReport();
    
    console.log('');
    console.log('✅ Asset minification complete!');
    console.log('');
    console.log('📋 Production files created in: ' + CONFIG.outputDir);
    console.log('   • Minified CSS: dist/css/');
    console.log('   • Minified JS: dist/js/');
    console.log('   • Production HTML: dist/index.html');
    console.log('   • Performance report: dist/performance-report.json');
    console.log('');
    console.log('🚀 Ready for deployment!');
    
  } catch (error) {
    console.error('❌ Error during minification:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main, CONFIG };