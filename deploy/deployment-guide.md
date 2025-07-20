# ThirdParty Platform Deployment Guide

## Overview
This guide covers deployment options for the ThirdParty platform to make it publicly available.

## Quick Deployment Options

### 1. Railway (Recommended - Free Tier Available)
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login to Railway
railway login

# 3. Initialize project
railway init

# 4. Deploy
railway up
```

### 2. Render (Free Tier Available)
```bash
# 1. Push code to GitHub
git add .
git commit -m "Deploy to Render"
git push origin main

# 2. Connect repository to Render
# - Go to render.com
# - Connect GitHub repository
# - Use render.yaml configuration
```

### 3. Vercel (Serverless - Free Tier)
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Follow prompts
```

### 4. Netlify (Static + Functions)
```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build and deploy
npm run build
netlify deploy --prod
```

### 5. Docker (Self-hosted)
```bash
# 1. Build Docker image
docker build -t thirdparty-platform .

# 2. Run container
docker run -p 3001:3001 -v thirdparty_data:/app/data thirdparty-platform
```

## Environment Variables
Set these in your deployment platform:

### Required
- `NODE_ENV=production`
- `PORT=3001` (or platform default)

### Optional
- `DATA_DIRECTORY=/app/data`
- `ADMIN_EMAIL=your-admin@email.com`
- `ADMIN_PASSWORD=your-secure-password`

## Database Considerations

### SQLite (Default)
- Works with most platforms
- Data persists in mounted volume
- Good for small to medium scale

### Platform-Specific Notes

#### Railway
- Provides persistent volumes
- Automatic HTTPS
- Custom domains available

#### Render
- Persistent disks available
- Auto-deploy from Git
- Free tier includes 750 hours/month

#### Vercel
- Serverless functions
- May need database adapter for persistence
- Good for high traffic

#### Netlify
- Serverless functions
- Great for static content
- Edge computing capabilities

## Pre-Deployment Checklist

### 1. Build Test
```bash
npm run deploy:build
cd dist
npm ci --omit=dev
node server/index.js
```

### 2. Environment Setup
- [ ] Set NODE_ENV=production
- [ ] Configure PORT if needed
- [ ] Set up data directory
- [ ] Configure admin credentials

### 3. Domain & SSL
- [ ] Point domain to deployment
- [ ] Verify HTTPS is working
- [ ] Test all endpoints

### 4. Performance
- [ ] Enable gzip compression
- [ ] Optimize images
- [ ] Set up caching headers
- [ ] Monitor response times

## Troubleshooting Common Issues

### Build Failures
1. Clear node_modules and reinstall
2. Check Node.js version (requires 18+)
3. Verify all dependencies are installed
4. Run build locally first

### Database Issues
1. Ensure DATA_DIRECTORY is writable
2. Check disk space
3. Verify SQLite is supported on platform

### Permission Errors
1. Ensure proper file permissions
2. Check if running as non-root user
3. Verify upload directory permissions

### Network Issues
1. Check port configuration
2. Verify CORS settings
3. Test API endpoints individually

## Monitoring & Maintenance

### Health Checks
- Endpoint: `/api/health`
- Should return 200 status
- Includes database connectivity

### Logs
Monitor these logs:
- Application startup
- Database connections
- API request/response times
- Error messages

### Backups
Regular backup of:
- SQLite database file
- Uploaded images
- Configuration files

## Support & Resources

### Documentation
- Platform-specific guides in deploy/ folder
- Environment configuration examples
- Docker setup instructions

### Community
- GitHub Issues for bug reports
- Discussion forums for questions
- Email support: support@thirdparty.mw

## Security Considerations

### Production Hardening
1. Change default admin credentials
2. Set secure session secrets
3. Configure CORS properly
4. Use HTTPS only
5. Regular security updates

### File Uploads
1. Validate file types
2. Limit file sizes
3. Scan for malware
4. Use cloud storage for scale

Ready to deploy? Choose your platform and follow the specific guide!
