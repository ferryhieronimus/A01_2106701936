# AAW Marketplace Microservices

## Overview

A microservices-based marketplace application built with Express.js, PostgreSQL, and Drizzle ORM. Each service is independently deployable and has its own database.

## Prerequisites

- Node.js 18.18.2
- pnpm
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Quick Start with Docker

```bash
# Clone the repository
git clone <repository-url>

# Create network
docker network create marketplace-network

# Authentication Service
cd authentication
cp .env.example .env
docker compose up -d
pnpm install
pnpm migrate
cd ..

# Tenant Service
cd tenant
cp .env.example .env
docker compose up -d
pnpm install
pnpm migrate
cd ..

# Product Service
cd products
cp .env.example .env
docker compose up -d
pnpm install
pnpm migrate
cd ..

# Order Service
cd orders
cp .env.example .env
docker compose up -d
pnpm install
pnpm migrate
cd ..

# Wishlist Service
cd wishlist
cp .env.example .env
docker compose up -d
pnpm install
pnpm migrate
cd ..
```

## API Endpoints

Refer to yaml files for API documentation.