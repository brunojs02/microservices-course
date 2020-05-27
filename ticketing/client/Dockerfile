FROM node:12-alpine

WORKDIR /app
COPY package.json .
RUN yarn install --prod
COPY . .

CMD ["yarn", "dev"]