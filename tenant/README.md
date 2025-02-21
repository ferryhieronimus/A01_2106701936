# Wishlist API

## Overview

REST API for a wishlist microservice built with Express.js, PostgreSQL, and Drizzle ORM. Part of AAW Marketplace microservices architecture handling user wishlists.

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
SERVICE_NAME=wishlist-service
PORT=8005
NODE_ENV=development

# Tenant Configuration
TENANT_ID=47dd6b24-0b23-46b0-a662-776158d089ba

# Database Configuration
DB_HOST=localhost
DB_PORT=5437
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=wishlist_db

# Service URLs
AUTH_SERVICE_URL=http://localhost:8000
PRODUCT_SERVICE_URL=http://localhost:8002
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

Base URL: http://localhost:8003

### Core Endpoints

```plaintext
GET    /api/wishlists           - List user's wishlists
GET    /api/wishlists/:id      - Get wishlist by ID
POST   /api/wishlists          - Create new wishlist
PUT    /api/wishlists/:id      - Update wishlist
DELETE /api/wishlists/:id      - Delete wishlist
GET    /health                - Service health check
```

## Database Schema

Managed through Drizzle ORM with migrations in drizzle directory:

- `wishlists` - Wishlist information
- `wishlist_items` - Products in wishlists