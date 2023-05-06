FROM node:18-alpine

WORKDIR /app
RUN corepack enable
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 3000

CMD ["node", "build/index.js"]
