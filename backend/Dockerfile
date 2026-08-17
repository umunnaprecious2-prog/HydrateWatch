FROM node:20-alpine AS base
WORKDIR /app
# Prisma's engine binaries need OpenSSL, which the alpine base image doesn't
# ship by default (without it the engine fails with a "Could not parse
# schema engine response" JSON error at startup).
RUN apk add --no-cache openssl
# Prisma phones home for its update-check by default; that call can hang for
# minutes (spinning CPU on retries) in networks without outbound HTTPS, so
# disable it everywhere in this image.
ENV CHECKPOINT_DISABLE=1
ENV PRISMA_HIDE_UPDATE_MESSAGE=1

# ---- Dependencies (cached separately from source) ----
FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# ---- Build TypeScript -> dist ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN node_modules/.bin/prisma generate
RUN npm run build

# ---- Production runtime ----
FROM base AS runtime
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY prisma ./prisma

EXPOSE 8000

# Apply any pending migrations, then start the API server.
CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node dist/server.js"]
