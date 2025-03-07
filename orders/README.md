# Order API

## Overview

REST API for an order microservice built with Express.js, PostgreSQL, and Drizzle ORM. Part of AAW Marketplace microservices architecture handling order management.

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
SERVICE_NAME=order-service
PORT=8003
NODE_ENV=development

# Tenant Configuration
TENANT_ID=9054983f-77b9-4db6-b2ff-fa4c858b0a1f

# Database Configuration
DB_HOST=localhost
DB_PORT=5435
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=order_db

# Service URLs
AUTH_SERVICE_URL=http://localhost:8000
PRODUCT_SERVICE_URL=http://localhost:8002
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

Base URL: http://localhost:8001

### Core Endpoints

```plaintext
POST   /api/orders            - Create new order
GET    /api/orders           - List all orders
GET    /api/orders/:id       - Get order by ID
PUT    /api/orders/:id       - Update order status
DELETE /api/orders/:id       - Cancel order
GET    /health              - Service health check
```

## Database Schema

Managed through Drizzle ORM with migrations in drizzle directory:

- `orders` - Order information and status
- `order_items` - Items within each order
