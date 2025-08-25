FROM --platform=linux/arm64 node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM --platform=linux/arm64 node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080

CMD ["node", "dev/server.js"]
