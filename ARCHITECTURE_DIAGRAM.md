# 🏗️ Deployment Architecture

## Production Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         INTERNET                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │   Port 80/443  │
                    │   (Nginx SSL)  │
                    └────────┬───────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│   Frontend     │  │    Backend     │  │   MongoDB      │
│   Container    │  │   Container    │  │   Container    │
│                │  │                │  │                │
│  Nginx:80      │──│  Node.js:5000  │──│  Mongo:27017   │
│  React App     │  │  Express API   │  │  Database      │
└────────────────┘  └────────────────┘  └────────────────┘
         │                   │                   │
         └───────────────────┴───────────────────┘
                             │
                    ┌────────▼───────┐
                    │ Docker Network │
                    │  blog-network  │
                    └────────────────┘
```

## Container Details

### Frontend Container
- **Base Image:** nginx:alpine
- **Port:** 80
- **Health Check:** /health endpoint
- **Features:**
  - Gzip compression
  - Security headers
  - Static asset caching
  - SPA routing

### Backend Container
- **Base Image:** node:20-alpine
- **Port:** 5000
- **Environment:**
  - NODE_ENV=production
  - MONGO_URI=mongodb://mongo:27017/codeblog
  - JWT_SECRET=(configured)
- **Features:**
  - JWT authentication
  - RESTful API
  - Email verification

### MongoDB Container
- **Base Image:** mongo:7-jammy
- **Port:** 27017
- **Volumes:**
  - mongo-data:/data/db
  - mongo-config:/data/configdb
- **Features:**
  - Persistent storage
  - Health checks
  - Auto-restart

## Data Flow

```
User Request
    │
    ▼
Nginx (Frontend Container)
    │
    ├─── Static Files (HTML, CSS, JS) ──► Browser
    │
    └─── API Calls (/api/*)
            │
            ▼
        Backend Container
            │
            ├─── Authentication (JWT)
            │
            ├─── Business Logic
            │
            └─── Database Queries
                    │
                    ▼
                MongoDB Container
                    │
                    └─── Data Storage
```

## Deployment Options

### 1. Docker Compose (Recommended)
```bash
docker-compose up -d
```
- ✅ Easy setup
- ✅ All services included
- ✅ Automatic networking
- ✅ Health checks
- ✅ Persistent data

### 2. Kubernetes
```bash
kubectl apply -f k8s-deployment.yml
```
- ✅ Auto-scaling
- ✅ Load balancing
- ✅ Self-healing
- ✅ Rolling updates
- ✅ Enterprise-ready

### 3. Individual Containers
```bash
docker run -d -p 80:80 blog-frontend
```
- ✅ Frontend only
- ✅ Lightweight
- ✅ Quick testing

## Network Architecture

```
┌─────────────────────────────────────────────────────┐
│              Docker Network: blog-network            │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  Frontend    │  │   Backend    │  │  MongoDB  │ │
│  │              │  │              │  │           │ │
│  │  Accessible  │  │  Accessible  │  │  Internal │ │
│  │  Externally  │  │  Externally  │  │  Only     │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────┐
│         Security Layers             │
├─────────────────────────────────────┤
│ 1. Firewall (UFW/iptables)         │
│    - Allow: 80, 443, SSH           │
│    - Deny: All other ports         │
├─────────────────────────────────────┤
│ 2. Nginx Security Headers          │
│    - X-Frame-Options               │
│    - X-Content-Type-Options        │
│    - X-XSS-Protection              │
├─────────────────────────────────────┤
│ 3. Application Security            │
│    - JWT Authentication            │
│    - Password Hashing (bcrypt)     │
│    - CORS Configuration            │
├─────────────────────────────────────┤
│ 4. Database Security               │
│    - Network Isolation             │
│    - Authentication (optional)     │
│    - Encrypted Connections         │
├─────────────────────────────────────┤
│ 5. Container Security              │
│    - Non-root users                │
│    - Read-only filesystems         │
│    - Resource limits               │
└─────────────────────────────────────┘
```

## Scaling Strategy

### Horizontal Scaling (Kubernetes)
```
Initial: 2 replicas
    │
    ├─── CPU > 70% ──► Scale up to 10 replicas
    │
    └─── CPU < 30% ──► Scale down to 2 replicas
```

### Vertical Scaling (Resources)
```
Frontend:
  Requests: 128Mi RAM, 100m CPU
  Limits:   256Mi RAM, 200m CPU

Backend:
  Requests: 256Mi RAM, 200m CPU
  Limits:   512Mi RAM, 500m CPU

MongoDB:
  Requests: 512Mi RAM, 500m CPU
  Limits:   1Gi RAM,   1000m CPU
```

## Monitoring Points

```
┌─────────────────────────────────────┐
│      Monitoring Dashboard           │
├─────────────────────────────────────┤
│ ✓ Container Health                 │
│ ✓ Resource Usage (CPU/RAM)         │
│ ✓ Response Times                   │
│ ✓ Error Rates                      │
│ ✓ Database Connections             │
│ ✓ Disk Usage                       │
│ ✓ Network Traffic                  │
└─────────────────────────────────────┘
```

## Backup Strategy

```
Daily Backups
    │
    ├─── MongoDB Data
    │    └─── Retention: 7 days
    │
    ├─── Application Logs
    │    └─── Retention: 30 days
    │
    └─── Configuration Files
         └─── Retention: Indefinite
```

## Disaster Recovery

```
Incident Detected
    │
    ▼
Check Health Status
    │
    ├─── Container Failed ──► Auto-restart (Docker)
    │
    ├─── Data Corrupted ──► Restore from backup
    │
    └─── Complete Failure ──► Rollback to previous version
```

## CI/CD Pipeline

```
Code Push (GitHub)
    │
    ▼
GitHub Actions Triggered
    │
    ├─── Run Linter
    │
    ├─── Run Tests
    │
    ├─── Build Docker Image
    │
    ├─── Push to Docker Hub
    │
    └─── Deploy to Server
            │
            ▼
        Production Live
```

## Performance Optimization

```
┌─────────────────────────────────────┐
│     Performance Features            │
├─────────────────────────────────────┤
│ ✓ Gzip Compression (Nginx)         │
│ ✓ Static Asset Caching             │
│ ✓ Code Splitting (React)           │
│ ✓ Lazy Loading                     │
│ ✓ Minification                     │
│ ✓ Tree Shaking                     │
│ ✓ HTTP/2 Support                   │
│ ✓ CDN Integration (optional)       │
└─────────────────────────────────────┘
```

---

**This architecture is production-ready and scalable!** 🚀
