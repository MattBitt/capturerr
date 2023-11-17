# Build stage
FROM bitnami/node:18 AS build
WORKDIR /app

# Install pnpm with corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Prepare pnpm dependencies using lockfile, patches and docker cache
COPY pnpm-lock.yaml .
COPY patches/ patches/
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch

# Install and build the app
COPY . .
RUN pnpm install
RUN pnpm build

# Production stage
FROM bitnami/node:18 AS prod
WORKDIR /app

# Create a non-root user
RUN groupadd -g 10001 nuxt && \
  useradd -u 10001 -g nuxt nuxt \
  && chown -R nuxt:nuxt /app

# Switch to the non-root user
USER nuxt:nuxt

# Set the environment to production
ENV NODE_ENV=production

# Copy the built app from the build stage
COPY --chown=nuxt:nuxt --from=build /app/.app/.output .output

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", ".output/server/index.mjs"]
