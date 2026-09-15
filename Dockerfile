##Устанавливаем зависимости
#FROM node:24-alpine3.24 as dependencies
#WORKDIR /app
#RUN npm install -g pnpm@10.34.5
#COPY package*.json ./
#RUN pnpm install --ignore-scripts && pnpm approve-builds
#
##Билдим приложение
##Кэширование зависимостей — если файлы в проекте изменились,
##но package.json остался неизменным, то стейдж с установкой зависимостей повторно не выполняется, что экономит время.
#FROM node:24-alpine3.24 as builder
#WORKDIR /app
#RUN npm install -g pnpm@10.34.5
#ENV NEXT_PUBLIC_API_URL=https://lumosapp.net/api/v1
#ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LclLHUtAAAAAEO0UcvZn9iuW92ENQUDa6ByDR96
#COPY . .
#COPY --from=dependencies /app/node_modules ./node_modules
#RUN pnpm run build:production
#
##Стейдж запуска
#FROM node:24-alpine3.24 as runner
#RUN npm install -g pnpm@10.34.5
#ENV NODE_ENV=production
#ENV NEXT_PUBLIC_API_URL=https://lumosapp.net/api/v1
#ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LclLHUtAAAAAEO0UcvZn9iuW92ENQUDa6ByDR96
#USER node
#WORKDIR /app
#ENV NODE_ENV production
#COPY --from=builder /app/ ./
#EXPOSE 3000
#CMD ["pnpm", "start"]







#
## =========================
## Dependencies
## =========================
#FROM node:24-alpine3.24 AS dependencies
#WORKDIR /app
#RUN npm install -g pnpm@10.34.5
#COPY package.json pnpm-lock.yaml ./
#RUN pnpm install --frozen-lockfile
#
## =========================
## Builder
## =========================
#FROM node:24-alpine3.24 AS builder
#WORKDIR /app
#RUN npm install -g pnpm@10.34.5
#COPY . .
#COPY --from=dependencies /app/node_modules ./node_modules
#
#ARG NEXT_PUBLIC_API_URL
#ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
#
#ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
#ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
#
#RUN pnpm run build:production
#
## =========================
## Runner
## =========================
#FROM node:24-alpine3.24 AS runner
#RUN npm install -g pnpm@10.34.5
#WORKDIR /app
#ENV NODE_ENV=production
#
#ARG NEXT_PUBLIC_API_URL
#ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
#
#ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
#ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
#
#USER node
#COPY --from=builder /app/ ./
#EXPOSE 3000
#CMD ["pnpm", "start"]









# OPTIMIZED
# =========================
# Dependencies
# =========================
FROM node:24-alpine3.24 AS dependencies
WORKDIR /app
RUN npm install -g pnpm@10.34.5
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# =========================
# Builder
# =========================
FROM node:24-alpine3.24 AS builder
WORKDIR /app
RUN npm install -g pnpm@10.34.5
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

RUN pnpm run build:production

# =========================
# Runner
# =========================
FROM node:24-alpine3.24 AS runner
WORKDIR /app
ENV NODE_ENV=production

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]
