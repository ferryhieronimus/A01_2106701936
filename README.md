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

## Load Test

Below are available load test scripts in each service. Make sure that you are in the correct service directory before running the scripts. Beware that the load test use k6 and there are some environment variables that need to be set in the `.env` file and also setup the data.

```
// Authentication
npm run load-test:register
npm run load-test:login

// Product
npm run load-test:get-all-products
npm run load-test:get-product-by-id
npm run load-test:get-all-categories
npm run load-test:get-category-by-id
npm run load-test:create-product
npm run load-test:create-category

// Order
npm run load-test:cart:add-item
npm run load-test:cart:get-all
npm run load-test:order:get-all
npm run load-test:order:place
npm run load-test:order:pay
npm run load-test:order:cancel

// Wishlist
npm run load-test:create
npm run load-test:getall
npm run load-test:getbyid
npm run load-test:edit
npm run load-test:remove

// Tenant
npm run load-test:get
npm run load-test:create
npm run load-test:edit
npm run load-test:delete
```