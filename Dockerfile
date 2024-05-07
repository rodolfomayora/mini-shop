# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.20.2
# ARG NODE_VERSION=20.11.0

# Base STAGE
FROM node:${NODE_VERSION} AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN --mount=type=bind,source=package.json,target=package.json \
    corepack install
WORKDIR /usr/src/app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install
COPY . .

# Dev STAGE
FROM base AS dev
EXPOSE 3001
CMD pnpm dev

# Build STAGE
FROM base as build
RUN pnpm build
# heads up!! this should be 'RUN' not 'CMD'

# Production STAGE (container image optimization)
# Nginx or Apache Server for Frontend 
FROM nginx:1.25.4-alpine AS prod
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE  80
# Nginx default port is 80
# In case i want to use a custom 'nginx.conf'
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE  8989
CMD ["nginx", "-g", "daemon off;"]