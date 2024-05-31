FROM node:18.20.3-alpine3.20

COPY src ./src
COPY public ./public

COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 80

CMD ["node", "./src/server.js"]