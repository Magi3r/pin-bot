FROM node:24-slim as build
WORKDIR /app
COPY /dist/src .
RUN npm i --omit="dev"

FROM node:24-slim

COPY --from=build /app /
CMD ["node", "bot.js", "-u"]