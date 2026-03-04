FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src

EXPOSE 5000

# Run migrations then start the server
CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]
