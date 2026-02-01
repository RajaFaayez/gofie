#!/usr/bin/env node

/**
 * Production Build Script for GofieVFX Portfolio
 * 
 * Orchestrates the complete optimization process:
 * 1. Image optimization setup
 * 2. Asset minification
 * 3. Performance testing
 * 4. Build validation
 * 5. Deployment preparation
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import build modules
const imageOptimizer = require('./optimize-images');
const assetMinifier = require('./minify-assets');
const performanceTester = require('./performance-test');

/**
 * Main build process
 */
async function buildProduction() {
  console.log('🚀 Starting production build process...');
  console.log('');
  
  const buildStart = Date.now();
  const buildResults = {
    steps: [],
    totalTime: 0,
    success: false
  };
  
  try {
    // Step 1: Image Optimization Setup
    console.log('📸 Step 1: Setting up image optimization...');
    const imageStart = Date.now();
    
    imageOptimizer.main();
    
    const imageTime = Date.now() - imageStart;
    buildResults.steps.push({
      name: 'Image Optimization Setup',
      time: imageTime,
      success: true
    });
    
    console.log('✅ Image optimization setup completed in ' + imageTime + 'ms');
    console.log('');
    
    // Step 2: Asset Minification
    console.log('📦 Step 2: Minifying assets...');
    const minifyStart = Date.now();
    
    assetMinifier.main();
    
    const minifyTime = Date.now() - minifyStart;
    buildResults.steps.push({
      name: 'Asset Minification',
      time: minifyTime,
      success: true
    });
    
    console.log('✅ Asset minification completed in ' + minifyTime + 'ms');
    console.log('');
    
    // Step 3: Performance Testing
    console.log('⚡ Step 3: Running performance tests...');
    const testStart = Date.now();
    
    performanceTester.main();
    
    const testTime = Date.now() - testStart;
    buildResults.steps.push({
      name: 'Performance Testing',
      time: testTime,
      success: true
    });
    
    console.log('✅ Performance testing completed in ' + testTime + 'ms');
    console.log('');
    
    // Step 4: Build Validation
    console.log('🔍 Step 4: Validating build...');
    const validationStart = Date.now();
    
    const validationResults = validateBuild();
    
    const validationTime = Date.now() - validationStart;
    buildResults.steps.push({
      name: 'Build Validation',
      time: validationTime,
      success: validationResults.success,
      details: validationResults
    });
    
    if (validationResults.success) {
      console.log('✅ Build validation passed in ' + validationTime + 'ms');
    } else {
      console.log('❌ Build validation failed in ' + validationTime + 'ms');
      console.log('Issues found:');
      validationResults.issues.forEach(issue => {
        console.log('  • ' + issue);
      });
    }
    console.log('');
    
    // Step 5: Deployment Preparation
    if (validationResults.success) {
      console.log('📦 Step 5: Preparing for deployment...');
      const deployStart = Date.now();
      
      const deployResults = prepareDeployment();
      
      const deployTime = Date.now() - deployStart;
      buildResults.steps.push({
        name: 'Deployment Preparation',
        time: deployTime,
        success: deployResults.success,
        details: deployResults
      });
      
      if (deployResults.success) {
        console.log('✅ Deployment preparation completed in ' + deployTime + 'ms');
      } else {
        console.log('❌ Deployment preparation failed in ' + deployTime + 'ms');
      }
      console.log('');
    }
    
    // Calculate total time
    buildResults.totalTime = Date.now() - buildStart;
    buildResults.success = buildResults.steps.every(step => step.success);
    
    // Generate build report
    generateBuildReport(buildResults);
    
    // Final summary
    console.log('📋 Build Summary:');
    console.log('   Total time: ' + buildResults.totalTime + 'ms');
    console.log('   Steps completed: ' + buildResults.steps.length);
    console.log('   Success: ' + (buildResults.success ? 'Yes' : 'No'));
    console.log('');
    
    if (buildResults.success) {
      console.log('🎉 Production build completed successfully!');
      console.log('');
      console.log('📁 Production files are ready in the dist/ directory');
      console.log('🚀 Ready for deployment!');
    } else {
      console.log('❌ Production build failed. Check the issues above.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Build process failed:', error.message);
    
    buildResults.totalTime = Date.now() - buildStart;
    buildResults.success = false;
    buildResults.error = error.message;
    
    generateBuildReport(buildResults);
    process.exit(1);
  }
}

/**
 * Validates the build output
 */
function validateBuild() {
  const validation = {
    success: true,
    issues: [],
    checks: []
  };
  
  // Check required files exist
  const requiredFiles = [
    'dist/index.html',
    'dist/css/main.min.css',
    'dist/js/main.min.js',
    'dist/js/email-config.min.js',
    'assets/portfolio/manifest.json',
    'js/lazy-loading.js'
  ];
  
  requiredFiles.forEach(file => {
    const exists = fs.existsSync(file);
    validation.checks.push({
      name: 'File exists: ' + file,
      passed: exists
    });
    
    if (!exists) {
      validation.success = false;
      validation.issues.push('Missing required file: ' + file);
    }
  });
  
  // Check file sizes are reasonable
  const sizeChecks = [
    { file: 'dist/css/main.min.css', maxSize: 50000 },
    { file: 'dist/js/main.min.js', maxSize: 60000 }
  ];
  
  sizeChecks.forEach(check => {
    try {
      const stats = fs.statSync(check.file);
      const passed = stats.size <= check.maxSize;
      
      validation.checks.push({
        name: 'File size check: ' + check.file + ' (' + stats.size + ' bytes)',
        passed: passed
      });
      
      if (!passed) {
        validation.success = false;
        validation.issues.push(check.file + ' is too large: ' + stats.size + ' bytes (max: ' + check.maxSize + ')');
      }
    } catch (error) {
      validation.success = false;
      validation.issues.push('Could not check size of ' + check.file + ': ' + error.message);
    }
  });
  
  // Check HTML contains optimized references
  try {
    const html = fs.readFileSync('dist/index.html', 'utf8');
    
    const htmlChecks = [
      { name: 'Contains minified CSS reference', pattern: /main\.min\.css/ },
      { name: 'Contains minified JS reference', pattern: /main\.min\.js/ },
      { name: 'Contains performance optimizations', pattern: /preconnect|dns-prefetch|preload/ }
    ];
    
    htmlChecks.forEach(check => {
      const passed = check.pattern.test(html);
      validation.checks.push({
        name: check.name,
        passed: passed
      });
      
      if (!passed) {
        validation.success = false;
        validation.issues.push('HTML validation failed: ' + check.name);
      }
    });
    
  } catch (error) {
    validation.success = false;
    validation.issues.push('Could not validate HTML: ' + error.message);
  }
  
  return validation;
}

/**
 * Prepares files for deployment
 */
function prepareDeployment() {
  const deployment = {
    success: true,
    files: [],
    issues: []
  };
  
  try {
    // Copy essential files to dist directory
    const filesToCopy = [
      { src: 'js/lazy-loading.js', dest: 'dist/js/lazy-loading.js' },
      { src: 'assets/portfolio/manifest.json', dest: 'dist/assets/portfolio/manifest.json' },
      { src: 'assets/portfolio/optimized-images.css', dest: 'dist/assets/portfolio/optimized-images.css' },
      { src: 'assets/portfolio/optimized-images.js', dest: 'dist/assets/portfolio/optimized-images.js' }
    ];
    
    filesToCopy.forEach(file => {
      try {
        // Ensure destination directory exists
        const destDir = path.dirname(file.dest);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        
        // Copy file
        fs.copyFileSync(file.src, file.dest);
        deployment.files.push(file.dest);
        
      } catch (error) {
        deployment.success = false;
        deployment.issues.push('Failed to copy ' + file.src + ': ' + error.message);
      }
    });
    
    // Create deployment manifest
    const deploymentManifest = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      files: deployment.files,
      optimizations: {
        minification: true,
        lazyLoading: true,
        imageOptimization: true,
        performanceTesting: true
      }
    };
    
    fs.writeFileSync(
      'dist/deployment-manifest.json',
      JSON.stringify(deploymentManifest, null, 2)
    );
    
    deployment.files.push('dist/deployment-manifest.json');
    
  } catch (error) {
    deployment.success = false;
    deployment.issues.push('Deployment preparation failed: ' + error.message);
  }
  
  return deployment;
}

/**
 * Generates comprehensive build report
 */
function generateBuildReport(buildResults) {
  const report = {
    timestamp: new Date().toISOString(),
    buildTime: buildResults.totalTime,
    success: buildResults.success,
    steps: buildResults.steps,
    error: buildResults.error || null,
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      cwd: process.cwd()
    }
  };
  
  fs.writeFileSync('build-report.json', JSON.stringify(report, null, 2));
  console.log('📊 Build report saved: build-report.json');
}

// Run if called directly
if (require.main === module) {
  buildProduction();
}

module.exports = { buildProduction };