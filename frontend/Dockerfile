FROM node:20-alpine AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- Build ----
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

# ---- Production runtime (standalone Next.js output) ----
FROM base AS runtime
ENV NODE_ENV=production
# Docker sets HOSTNAME to the container ID by default, and Next's standalone
# server binds to whatever HOSTNAME resolves to instead of all interfaces -
# without this override it listens only on the container's own IP and is
# unreachable through the published port.
ENV HOSTNAME=0.0.0.0
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
