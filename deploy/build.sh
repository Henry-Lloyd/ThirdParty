#!/bin/bash

# ThirdParty Build Script for Production Deployment
set -e

echo "🚀 Starting ThirdParty production build..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/.cache/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Run build
echo "🔨 Building application..."
npm run build

# Verify build output
echo "✅ Verifying build output..."
if [ ! -d "dist/public" ]; then
    echo "❌ Frontend build failed - dist/public directory not found"
    exit 1
fi

if [ ! -d "dist/server" ]; then
    echo "❌ Backend build failed - dist/server directory not found"
    exit 1
fi

if [ ! -f "dist/server/index.js" ]; then
    echo "❌ Server entry point not found"
    exit 1
fi

if [ ! -f "dist/public/index.html" ]; then
    echo "❌ Frontend entry point not found"
    exit 1
fi

# Copy package files
echo "📋 Copying package files..."
cp package.json dist/
cp package-lock.json dist/

# Create production package.json
echo "📝 Creating production package.json..."
node -e "
const pkg = require('./package.json');
const prodPkg = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  type: pkg.type,
  scripts: {
    start: 'node server/index.js'
  },
  dependencies: {
    'better-sqlite3': pkg.dependencies['better-sqlite3'],
    'kysely': pkg.dependencies.kysely,
    'express': pkg.dependencies.express,
    'dotenv': pkg.dependencies.dotenv,
    'multer': pkg.dependencies.multer
  }
};
require('fs').writeFileSync('dist/package.json', JSON.stringify(prodPkg, null, 2));
"

# Create deployment info
echo "📊 Creating deployment info..."
cat > dist/deployment-info.json << EOF
{
  "buildTime": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "buildVersion": "$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')",
  "nodeVersion": "$(node --version)",
  "platform": "$(uname -s)",
  "architecture": "$(uname -m)"
}
EOF

echo "✅ Build completed successfully!"
echo "📁 Build output in ./dist/"
echo "🚀 Ready for deployment!"
