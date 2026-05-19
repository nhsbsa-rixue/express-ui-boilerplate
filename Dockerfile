FROM node:20-alpine

ENV APP_NAME="UI Scaffold"
ENV PORT=8001

WORKDIR /app
COPY . /app

RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm run build
RUN pnpm prune --prod


EXPOSE 8001

ENTRYPOINT ["pnpm", "start"]

