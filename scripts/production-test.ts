import { spawn } from 'child_process';
import fetch from 'node-fetch';

console.log('🧪 Testing production build...');

// Build the application
console.log('📦 Building application...');
const buildProcess = spawn('npm', ['run', 'build'], {
  stdio: 'inherit'
});

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ Build failed!');
    process.exit(1);
  }
  
  console.log('✅ Build successful!');
  
  // Start production server
  console.log('🚀 Starting production server...');
  const serverProcess = spawn('node', ['dist/server/index.js'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: '3002',
      DATA_DIRECTORY: './test-data'
    }
  });
  
  // Wait for server to start
  setTimeout(async () => {
    try {
      console.log('🔍 Testing endpoints...');
      
      // Test health endpoint
      const healthResponse = await fetch('http://localhost:3002/api/health');
      if (healthResponse.ok) {
        console.log('✅ Health check passed');
      } else {
        console.error('❌ Health check failed');
      }
      
      // Test static files
      const staticResponse = await fetch('http://localhost:3002/');
      if (staticResponse.ok) {
        console.log('✅ Static files served');
      } else {
        console.error('❌ Static files failed');
      }
      
      console.log('🎉 Production test completed!');
      
    } catch (error) {
      console.error('❌ Test failed:', error.message);
    } finally {
      serverProcess.kill();
    }
  }, 3000);
});
