FROM node:16-alpine

WORKDIR /app
COPY ../frontend/package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY ../frontend .
RUN yarn build

EXPOSE 3000

CMD ["node", "build/index.js"]
