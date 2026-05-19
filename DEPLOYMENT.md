# Deployment Guide for Panacea Cleaning Services

This guide provides instructions for deploying the PCS application to various hosting platforms.

## Prerequisites

- Node.js 18+ installed locally
- MongoDB database (MongoDB Atlas for cloud)
- All third-party API keys ready (Twilio, Stripe, Google Maps, etc.)
- Git installed

## Environment Variables

Before deploying, ensure all required environment variables are set. See `.env.example` for the complete list.

### Critical Variables

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `TWILIO_SID`, `TWILIO_AUTH`: Twilio API credentials
- `STRIPE_SECRET_KEY`: Stripe secret key
- `GOOGLE_MAPS_API_KEY`: Google Maps API key
- `FRONTEND_URL`: URL of your frontend application

## Deployment Options

### Option 1: Railway.app (Recommended - Easiest)

1. Connect your GitHub repository to [Railway.app](https://railway.app)
2. Import your repository
3. Add environment variables in Railway dashboard
4. Deploy automatically on push

```bash
# Local testing with Railway CLI
railway run npm start
```

### Option 2: Render

1. Push the `render.yaml` configuration file
2. Go to [Render.com](https://render.com)
3. Create new service from GitHub repository
4. Set environment variables
5. Deploy

### Option 3: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create panacea-api

# Set environment variables
heroku config:set MONGO_URI=your_mongo_uri -a panacea-api
heroku config:set JWT_SECRET=your_secret -a panacea-api
# ... set other variables

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Option 4: Docker + Any Cloud Provider

#### Local Testing

```bash
# Build image
docker build -t panacea-backend .

# Run with docker-compose
docker-compose up -d

# Check logs
docker-compose logs -f backend

# Stop
docker-compose down
```

#### Push to Docker Registry (Docker Hub, ECR, GCR)

```bash
# Login to Docker Hub
docker login

# Tag image
docker tag panacea-backend your-username/panacea-backend:latest

# Push
docker push your-username/panacea-backend:latest
```

#### Deploy to AWS

```bash
# Using AWS CLI
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account-id.dkr.ecr.us-east-1.amazonaws.com

docker build -t panacea-backend .

docker tag panacea-backend:latest your-account-id.dkr.ecr.us-east-1.amazonaws.com/panacea-backend:latest

docker push your-account-id.dkr.ecr.us-east-1.amazonaws.com/panacea-backend:latest
```

### Option 5: DigitalOcean App Platform

1. Go to DigitalOcean Dashboard
2. Create new App
3. Connect GitHub repository
4. Set build configuration to Node.js
5. Add environment variables
6. Deploy

## Database Setup

### MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP addresses
5. Copy connection string to `MONGO_URI`

## Health Checks

The application provides a health check endpoint:

```
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-05-19T10:30:00.000Z",
  "uptime": 3600
}
```

## Monitoring

### Log Files

- Application logs: `combined.log`
- Error logs: `error.log`

### Using PM2 (for traditional servers)

```bash
npm install -g pm2

pm2 start server.js --name "panacea-api"
pm2 save
pm2 startup
```

## Scaling Considerations

- Use MongoDB Atlas for managed database
- Implement caching (Redis) for high traffic
- Use CDN for static assets
- Set up load balancing for multiple instances
- Monitor with tools like New Relic or Datadog

## Security Checklist

- [ ] All environment variables set securely
- [ ] MongoDB has network restrictions
- [ ] API keys are not exposed in code
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] HTTPS is enforced
- [ ] Security headers are set (Helmet.js)
- [ ] Request validation is in place
- [ ] SQL/NoSQL injection protection enabled
- [ ] Regular security audits scheduled

## Troubleshooting

### MongoDB Connection Issues

```bash
# Test connection
mongosh "mongodb+srv://username:password@cluster.mongodb.net/panacea"
```

### Port Issues

Make sure port 5000 is not in use:

```bash
# Linux/Mac
lsof -i :5000

# Windows
netstat -ano | findstr :5000
```

### Out of Memory

Increase Node heap size:

```bash
node --max-old-space-size=2048 server.js
```

## Support

For deployment issues:

1. Check application logs
2. Verify all environment variables
3. Test database connection
4. Review hosting platform documentation
5. Contact hosting provider support

## Post-Deployment

1. Test all API endpoints
2. Verify third-party integrations
3. Monitor application performance
4. Set up automated backups
5. Configure monitoring and alerts
6. Document your deployment process
