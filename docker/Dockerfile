FROM node:23-slim as build
WORKDIR /app
COPY /dist/src .
RUN npm i --omit="dev"

FROM node:23-slim

COPY --from=build /app /
CMD ["node", "bot.js", "-u"]