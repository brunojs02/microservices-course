FROM node:12-alpine

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --prod --frozen-lockfile
COPY . .

CMD ["yarn", "start"]