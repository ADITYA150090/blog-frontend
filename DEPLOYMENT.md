# 🚀 Production Deployment Guide

This guide covers deploying the Social Coding Blog Platform using Docker.

## 📋 Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- 2GB+ RAM available
- Port 80, 5000, and 27017 available

## 🏗️ Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Nginx     │─────▶│   Backend   │─────▶│   MongoDB   │
│  (Port 80)  │      │  (Port 5000)│      │ (Port 27017)│
└─────────────┘      └─────────────┘      └─────────────┘
```

## 🔧 Configuration

### 1. Environment Setup

Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

Edit `.env` with your production values:
```env
VITE_API_URL=http://your-domain.com:5000
VITE_APP_NAME=Social Coding Blog
NODE_ENV=production
```

### 2. Backend Configuration

Ensure your backend has a `.env` file with:
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://mongo:27017/codeblog
JWT_SECRET=your-super-secret-jwt-key-change-this
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**⚠️ IMPORTANT:** Change `JWT_SECRET` to a strong random string in production!

## 🚀 Deployment Options

### Option 1: Full Stack with Docker Compose (Recommended)

Deploy all services (frontend, backend, MongoDB):

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes database)
docker-compose down -v
```

### Option 2: Frontend Only

Build and run just the frontend:

```bash
# Build the Docker image
docker build -t blog-frontend .

# Run the container
docker run -d -p 80:80 --name blog-frontend blog-frontend

# View logs
docker logs -f blog-frontend

# Stop the container
docker stop blog-frontend
docker rm blog-frontend
```

### Option 3: Development Mode

For local development without Docker:

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔍 Health Checks

All services include health checks:

- **Frontend:** `http://localhost:80/health`
- **Backend:** `http://localhost:5000/health`
- **MongoDB:** Internal health check via mongosh

Check service health:
```bash
docker-compose ps
```

## 📊 Monitoring

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mongo
```

### Resource Usage

```bash
docker stats
```

## 🔒 Security Checklist

- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Update MongoDB credentials (add authentication)
- [ ] Use HTTPS in production (add SSL certificates)
- [ ] Set up firewall rules
- [ ] Enable CORS only for your domain
- [ ] Regularly update Docker images
- [ ] Backup MongoDB data regularly

## 🌐 Production Deployment (Cloud)

### AWS EC2 / DigitalOcean / Linode

1. **Launch a server** (Ubuntu 22.04 recommended)
2. **Install Docker:**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   sudo usermod -aG docker $USER
   ```

3. **Clone your repository:**
   ```bash
   git clone <your-repo-url>
   cd blog/frontend
   ```

4. **Configure environment:**
   ```bash
   cp .env.example .env
   nano .env  # Edit with production values
   ```

5. **Deploy:**
   ```bash
   docker-compose up -d
   ```

6. **Set up reverse proxy (optional):**
   - Use Nginx or Caddy for SSL termination
   - Point domain to your server IP

### Using Docker Hub

1. **Build and tag:**
   ```bash
   docker build -t yourusername/blog-frontend:latest .
   ```

2. **Push to Docker Hub:**
   ```bash
   docker login
   docker push yourusername/blog-frontend:latest
   ```

3. **Pull and run on server:**
   ```bash
   docker pull yourusername/blog-frontend:latest
   docker run -d -p 80:80 yourusername/blog-frontend:latest
   ```

## 🔄 Updates and Maintenance

### Update Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Remove old images
docker image prune -f
```

### Backup MongoDB

```bash
# Create backup
docker exec blog-mongodb mongodump --out /data/backup

# Copy backup to host
docker cp blog-mongodb:/data/backup ./mongodb-backup-$(date +%Y%m%d)

# Restore from backup
docker exec -i blog-mongodb mongorestore /data/backup
```

## 🐛 Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs frontend

# Restart specific service
docker-compose restart frontend
```

### Port already in use

```bash
# Find process using port 80
sudo lsof -i :80

# Kill process or change port in docker-compose.yml
```

### MongoDB connection issues

```bash
# Check if MongoDB is healthy
docker-compose ps

# Restart MongoDB
docker-compose restart mongo

# Check MongoDB logs
docker-compose logs mongo
```

### Build fails

```bash
# Clean build cache
docker-compose build --no-cache

# Remove all containers and rebuild
docker-compose down
docker-compose up -d --build
```

## 📈 Performance Optimization

- **Enable CDN** for static assets
- **Use Redis** for session storage (optional)
- **Set up load balancing** for high traffic
- **Enable HTTP/2** in nginx
- **Compress images** before uploading

## 🔗 Useful Commands

```bash
# View running containers
docker ps

# Access container shell
docker exec -it blog-frontend sh

# View container resource usage
docker stats blog-frontend

# Inspect container
docker inspect blog-frontend

# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune -a
```

## 📞 Support

For issues or questions:
- Check logs: `docker-compose logs -f`
- Review this guide
- Check Docker documentation
- Verify environment variables

---

**Made with ❤️ for production deployment!**
