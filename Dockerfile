FROM node:20-alpine

ENV APP_NAME="UI Scaffold"
ENV PORT=8001

WORKDIR /app
COPY . /app


RUN npm install -g rimraf
RUN npm install --omit-dev
RUN npm run build


EXPOSE 8001

ENTRYPOINT ["npm", "start"]

