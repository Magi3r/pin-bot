FROM node:18 as build
WORKDIR /app
COPY /dist/src .
RUN npm i --omit="dev"

FROM node:18-slim

COPY --from=build /app /
CMD ["node", "bot.js", "-u"]