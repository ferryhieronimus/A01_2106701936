# Products API

## Overview

REST API for a products microservice built with Express.js, PostgreSQL, and Drizzle ORM. Part of AAW Marketplace microservices architecture handling product catalog management.

## Prerequisites

- Node.js 18.18.2
- pnpm
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Quick Start with Docker

```bash
# Clone the repository
git clone <repository-url>

# Copy environment file
cp .env.example .env

# Create network (if not exists)
docker network create marketplace-network

# Start with Docker Compose
docker compose up
```

## Local Development Setup

```bash
# Install dependencies
pnpm install

# Setup database
pnpm run generate # Generate migrations

pnpm run migrate # Run migrations

# Start development server
pnpm dev
```

## Environment Variables

Copy .env.example to .env and configure:

```plaintext
# Service Information
SERVICE_NAME=product-service
PORT=8002
NODE_ENV=development

# Tenant Configuration
TENANT_ID=4bf747c4-a429-4f6c-83a9-3f38f6393979

# Database Configuration
DB_HOST=localhost
DB_PORT=5434
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=product_db

# Service URLs
AUTH_SERVICE_URL=http://localhost:8000
TENANT_SERVICE_URL=http://localhost:8003
```

## Available Scripts

```bash
pnpm dev      # Development mode with hot reload
pnpm build    # Build production
pnpm start    # Start production server
pnpm generate # Generate DB migrations
pnpm migrate  # Run DB migrations
```

## API Endpoints

Base URL: http://localhost:8002

### Core Endpoints

```plaintext
GET    /api/products           - List all products
GET    /api/products/:id      - Get product by ID
POST   /api/products          - Create new product
PUT    /api/products/:id      - Update product
DELETE /api/products/:id      - Delete product
GET    /health               - Service health check
```

## Database Schema

Managed through Drizzle ORM with migrations in drizzle directory:

- `products` - Product information and details
- `product_categories` - Product category management
- `product_images` - Product image URLs and metadata
