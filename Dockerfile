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