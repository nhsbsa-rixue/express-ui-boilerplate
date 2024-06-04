FROM node:20.14-alpine

ENV APP_NAME="express-ui-boilerplate"


COPY src ./src
COPY public ./public

COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 80

CMD ["node", "./src/server.js"]