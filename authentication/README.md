# Authentication API

## Overview

REST API for an authentication microservice built with Express.js, PostgreSQL, and Drizzle ORM. Part of AAW Marketplace microservices architecture handling user authentication and authorization.

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
SERVICE_NAME=auth-service
PORT=8000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=auth_ms_jwt_secret
ADMIN_JWT_SECRET=admin_auth_ms_jwt_secret

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=auth_db
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

Base URL: http://localhost:8000

### Core Endpoints

```plaintext
POST   /api/auth/login         - User login
POST   /api/auth/register      - User registration
POST   /api/auth/verify        - Verify JWT token
POST   /api/auth/verify-admin  - Verify admin JWT token
GET    /health                - Service health check
```

## Database Schema

Managed through Drizzle ORM with migrations in drizzle directory:

- `users` - User information and credentials
- `tokens` - JWT token management