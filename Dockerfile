FROM node:18.20.3-alpine3.20



# Set environment variable
ENV APP_NAME=My_App_NAME
ENV LANGUAGES=en,cy
ENV PORT=8080

COPY src ./src
COPY public ./public

COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 8080

CMD ["node", "./src/server.js"]