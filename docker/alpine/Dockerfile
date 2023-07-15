FROM node:18-alpine as build
WORKDIR /app
COPY /dist/src .
RUN npm i --omit="dev"

FROM node:18-alpine

COPY --from=build /app /
CMD ["node", "bot.js", "-u"]