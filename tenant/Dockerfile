FROM node:18.18.2 AS builder

WORKDIR /tenant-service

COPY package.json ./

# Install pnpm
RUN npm install -g pnpm typescript

# Install dependencies
RUN pnpm install

# Copy source
COPY . .

# Build
RUN pnpm run build

# Production image
FROM node:18.18.2-slim

ENV PORT 8000
ENV NODE_ENV production
ENV SERVICE_NAME tenant-service

WORKDIR /tenant-service

COPY --from=builder /tenant-service/dist ./dist
COPY --from=builder /tenant-service/package.json ./package.json

RUN npm install --only=production

EXPOSE 8000

CMD ["node", "dist/src/server.js"]