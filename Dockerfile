# Build Server
FROM node:20-alpine AS builder-server
WORKDIR /app

COPY server/package*.json .
RUN npm ci

COPY server/* ./
RUN npm run build

# Build Client
FROM node:20-alpine AS builder-client
WORKDIR /app

COPY client/package*.json .
RUN npm ci

COPY client/* ./
RUN npm run build

# Build Final Image
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=builder-server /app/build ./build
COPY --from=builder-server /app/node_modules ./node_modules
COPY --from=builder-client /app/dist ./build/public

EXPOSE 3001

CMD [ "node", "build/server.js" ]