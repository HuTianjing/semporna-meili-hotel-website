# Use Node.js 24 Alpine (LTS) - 当前最新 LTS 稳定版，使用 pnpm
FROM node:22-alpine AS base

# Install dependencies only when needed
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable Corepack for pnpm support
RUN corepack enable

# 1. Depedencies: Install dependencies based on pnpm-lock.yaml
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

# 2. Builder: Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
# Use SKIP_ENV_VALIDATION=1 to skip env validation during build time
RUN SKIP_ENV_VALIDATION=1 pnpm run build

# 3. Runner: Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy verify essential folders
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 创建日志目录并授权（pino-roll 写入日志文件）
RUN mkdir -p /app/logs && chown nextjs:nodejs /app/logs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static      

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
