import { spawn, ChildProcess } from 'child_process';
import { createServer } from 'vite';
import path from 'path';

let serverProcess: ChildProcess | null = null;
let viteServer: any = null;

async function startDev() {
  console.log('🚀 Starting ThirdParty Platform development environment...');

  // Clean up any existing processes
  cleanup();

  try {
    // Start the Express API server
    console.log('📡 Starting Express API server on port 3001...');
    serverProcess = spawn('npx', ['tsx', 'watch', 'server/index.ts'], {
      stdio: 'inherit',
      env: { 
        ...process.env, 
        NODE_ENV: 'development',
        PORT: '3001'
      },
      cwd: process.cwd()
    });

    // Handle server process errors
    serverProcess.on('error', (err) => {
      console.error('❌ Failed to start server process:', err);
      process.exit(1);
    });

    serverProcess.on('exit', (code, signal) => {
      if (code !== 0 && signal !== 'SIGTERM' && signal !== 'SIGINT') {
        console.error(`❌ Server process exited with code ${code}, signal ${signal}`);
        process.exit(1);
      }
    });

    // Wait a bit for the server to start
    console.log('⏳ Waiting for API server to start...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Start Vite dev server
    console.log('⚡ Starting Vite development server...');
    viteServer = await createServer({
      configFile: path.resolve('./vite.config.js'),
      root: path.resolve('./client'),
      server: {
        port: 3000,
        host: true,
        cors: true,
        proxy: {
          '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true,
            secure: false
          }
        }
      }
    });

    await viteServer.listen();
    console.log('✅ Vite dev server running on http://localhost:3000');
    console.log('✅ API server running on http://localhost:3001');
    console.log('🎉 Development environment ready!');
    console.log('');
    console.log('📝 Available URLs:');
    console.log('   Frontend: http://localhost:3000');
    console.log('   API Health: http://localhost:3001/api/health');
    console.log('   Admin: http://localhost:3000/admin/login');
    console.log('   System Test: http://localhost:3000/system-test');
    console.log('');
    
  } catch (error) {
    console.error('❌ Failed to start development environment:', error);
    cleanup();
    process.exit(1);
  }
}

function cleanup() {
  console.log('🔄 Cleaning up processes...');
  
  if (serverProcess) {
    console.log('Stopping API server...');
    serverProcess.kill('SIGTERM');
    serverProcess = null;
  }
  
  if (viteServer) {
    console.log('Stopping Vite server...');
    viteServer.close().catch(console.error);
    viteServer = null;
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  cleanup();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  cleanup();
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  cleanup();
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  cleanup();
  process.exit(1);
});

// Start the development environment
startDev().catch((error) => {
  console.error('❌ Failed to start development environment:', error);
  cleanup();
  process.exit(1);
});
