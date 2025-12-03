# Multi-stage build for optimized production image

# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev)
RUN npm ci

# Copy source code
COPY . .

# Build argument for backend URL
ARG VITE_API_URL=http://localhost:5000
ENV VITE_API_URL=${VITE_API_URL}

# Build the application
RUN npm run build

# Stage 2: Production image with nginx
FROM nginx:alpine

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:${PORT:-80}/health || exit 1

# Expose port (Railway will set PORT env var)
EXPOSE ${PORT:-80}

# Start nginx with dynamic port configuration
CMD ["/start.sh"]
