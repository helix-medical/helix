FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80