FROM node:20-alpine AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- Build (static export - see next.config.js output: "export") ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* vars are baked into the client bundle at build time, so they
# must be supplied as build args (see docker-compose.yml), not just at runtime.
ARG NEXT_PUBLIC_API_URL=http://localhost:8000
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
RUN npm run build

# ---- Production runtime: plain static file server ----
# The app is fully static (no route handlers, middleware, or server-only
# APIs - see next.config.js), so there's no Node process to run in
# production; this container exists only for local docker-compose parity.
# In production this same "out/" directory is deployed as a Render Static
# Site (CDN-served, no server, no cold-start delay), not this Dockerfile.
FROM nginx:alpine AS runtime
COPY --from=build /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
