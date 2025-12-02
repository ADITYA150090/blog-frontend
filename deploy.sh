#!/bin/bash

# 🚀 Quick Deployment Script for Blog Platform
# This script automates the deployment process

set -e  # Exit on error

echo "🚀 Blog Platform - Quick Deploy Script"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi
print_success "Docker is installed"

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi
print_success "Docker Compose is installed"

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_success "Created .env file from template"
        print_warning "Please edit .env file with your configuration before continuing"
        echo ""
        read -p "Press Enter to continue after editing .env file..."
    else
        print_error ".env.example not found. Please create .env file manually."
        exit 1
    fi
else
    print_success ".env file exists"
fi

# Ask deployment type
echo ""
echo "Select deployment type:"
echo "1) Production (Full stack with Docker Compose)"
echo "2) Frontend only"
echo "3) Development mode"
read -p "Enter choice [1-3]: " choice

case $choice in
    1)
        echo ""
        print_warning "Starting full stack deployment..."
        
        # Build and start all services
        docker-compose down 2>/dev/null || true
        docker-compose build --no-cache
        docker-compose up -d
        
        # Wait for services to be healthy
        echo ""
        echo "Waiting for services to be healthy..."
        sleep 10
        
        # Check service status
        docker-compose ps
        
        echo ""
        print_success "Deployment complete!"
        echo ""
        echo "Services are running:"
        echo "  Frontend: http://localhost:80"
        echo "  Backend:  http://localhost:5000"
        echo "  MongoDB:  localhost:27017"
        echo ""
        echo "View logs: docker-compose logs -f"
        echo "Stop services: docker-compose down"
        ;;
        
    2)
        echo ""
        print_warning "Building frontend only..."
        
        # Build Docker image
        docker build -t blog-frontend .
        
        # Stop existing container if running
        docker stop blog-frontend 2>/dev/null || true
        docker rm blog-frontend 2>/dev/null || true
        
        # Run container
        docker run -d -p 80:80 --name blog-frontend blog-frontend
        
        echo ""
        print_success "Frontend deployed!"
        echo ""
        echo "Frontend: http://localhost:80"
        echo ""
        echo "View logs: docker logs -f blog-frontend"
        echo "Stop: docker stop blog-frontend"
        ;;
        
    3)
        echo ""
        print_warning "Starting development mode..."
        
        # Install dependencies if needed
        if [ ! -d "node_modules" ]; then
            print_warning "Installing dependencies..."
            npm install
        fi
        
        # Start dev server
        npm run dev
        ;;
        
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

echo ""
print_success "Done! 🎉"
