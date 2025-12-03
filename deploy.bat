@echo off
REM 🚀 Quick Deployment Script for Blog Platform (Windows)
REM This script automates the deployment process

echo.
echo ========================================
echo 🚀 Blog Platform - Quick Deploy Script
echo ========================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)
echo ✓ Docker is installed

REM Check if Docker Compose is available
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)
echo ✓ Docker Compose is installed

REM Check if .env file exists
if not exist .env (
    echo ⚠ .env file not found.
    if exist .env.example (
        echo Creating .env file from template...
        copy .env.example .env
        echo ✓ Created .env file from template
        echo ⚠ Please edit .env file with your configuration
        echo.
        pause
    ) else (
        echo ✗ .env.example not found. Please create .env file manually.
        pause
        exit /b 1
    )
) else (
    echo ✓ .env file exists
)

REM Ask deployment type
echo.
echo Select deployment type:
echo 1) Production (Full stack with Docker Compose)
echo 2) Frontend only
echo 3) Development mode
echo.
set /p choice="Enter choice [1-3]: "

if "%choice%"=="1" (
    echo.
    echo ⚠ Starting full stack deployment...
    
    REM Stop existing services
    docker-compose down 2>nul
    
    REM Build and start all services
    docker-compose build --no-cache
    docker-compose up -d
    
    REM Wait for services
    echo.
    echo Waiting for services to be healthy...
    timeout /t 10 /nobreak >nul
    
    REM Check service status
    docker-compose ps
    
    echo.
    echo ✓ Deployment complete!
    echo.
    echo Services are running:
    echo   Frontend: http://localhost:80
    echo   Backend:  http://localhost:5000
    echo   MongoDB:  localhost:27017
    echo.
    echo View logs: docker-compose logs -f
    echo Stop services: docker-compose down
    
) else if "%choice%"=="2" (
    echo.
    echo ⚠ Building frontend only...
    
    REM Build Docker image
    docker build -t blog-frontend .
    
    REM Stop existing container
    docker stop blog-frontend 2>nul
    docker rm blog-frontend 2>nul
    
    REM Run container
    docker run -d -p 80:80 -e BACKEND_URL=http://host.docker.internal:5000 --name blog-frontend blog-frontend
    
    echo.
    echo ✓ Frontend deployed!
    echo.
    echo Frontend: http://localhost:80
    echo.
    echo View logs: docker logs -f blog-frontend
    echo Stop: docker stop blog-frontend
    
) else if "%choice%"=="3" (
    echo.
    echo ⚠ Starting development mode...
    
    REM Install dependencies if needed
    if not exist node_modules (
        echo Installing dependencies...
        call npm install
    )
    
    REM Start dev server
    call npm run dev
    
) else (
    echo ✗ Invalid choice
    pause
    exit /b 1
)

echo.
echo ✓ Done! 🎉
echo.
pause
