#Устанавливаем зависимости
FROM node:24-alpine3.24 as dependencies
WORKDIR /app
RUN npm install -g pnpm
ENV NEXT_PUBLIC_API_URL=https://lumosapp.net/api/v1
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LclLHUtAAAAAEO0UcvZn9iuW92ENQUDa6ByDR96
COPY package*.json ./
RUN pnpm install --ignore-scripts && pnpm approve-builds --yes

#Билдим приложение
#Кэширование зависимостей — если файлы в проекте изменились,
#но package.json остался неизменным, то стейдж с установкой зависимостей повторно не выполняется, что экономит время.
FROM node:24-alpine3.24 as builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm run build:production

#Стейдж запуска
FROM node:24-alpine3.24 as runner
RUN npm install -g pnpm
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=https://lumosapp.net/api/v1
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LclLHUtAAAAAEO0UcvZn9iuW92ENQUDa6ByDR96
USER node
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/ ./
EXPOSE 3000
CMD ["pnpm", "start"]
