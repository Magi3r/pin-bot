FROM node:23-alpine as build
WORKDIR /app
COPY /dist/src .
RUN npm i --omit="dev"

FROM node:23-alpine

COPY --from=build /app /
CMD ["node", "bot.js", "-u"]