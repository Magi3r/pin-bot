
# Pin-Bot
[![GitHub](https://img.shields.io/github/license/Magi3r/pin-bot)](LICENSE.md)

A simple discord bot for allowing anyone to pin and unpin messages.

Discord only allows pinning and unpinning messages for roles having the `Manage Messages` permission, which also allows deleting any message.

This bot is probably more useful for private servers where you have a group of people, e.g. for studying together. 
## Features

- Pin messages by messageID
- Pin messages by message link
- Unpin messages by messageID
- Unpin messages by message link

Thats all this bot was invented for.

## Installation
There are a couple of ways on how to run `pin-bot`:
- Using one of the precompiled binaries from the [releases page](https://github.com/Magi3r/pin-bot/releases/).
- Using `node` with the precompiled .js files in _js-src.zip_ from the [releases page](https://github.com/Magi3r/pin-bot/releases).

```bash
  npm install
  node .
```
- Downloading the .ts-source (aka. cloning this repo) and compile them yourself.

```bash
    git clone https://github.com/Magi3r/pin-bot
    cd pin-bot
    npm install
    npx tsc
    cd ./dist/src
    node bot.js
```
- You can also use [ts-node](https://www.npmjs.com/package/ts-node) to skip the compile step.

```bash
    git clone https://github.com/Magi3r/pin-bot
    cd pin-bot
    npm install
    npx ts-node
```

If you want to use the docker image, simply run:
```bash
docker run -d --name pin-bot --restart unless-stopped -e TOKEN=<your-token> magi3r/pin-bot:latest
```
If you prefer alpine because of the slightly smaller image size, run:
```bash
docker run -d --name pin-bot --restart unless-stopped -e TOKEN=<your-token> magi3r/pin-bot:alpine
```

## Usage
You need to provide a discord bot token. You can get one from the [developer portal](https://discord.com/developers/applications) by creating a new application. You can either provide it as:
- an environmental variable
```bash
TOKEN=<your-token> node bot.js
```
- saving it in a .env file. It will automatically be loaded
```bash
TOKEN=<your-token>
```
- providing it as a command line argument. A token provided this way will be used instead of a token provided as environment variable.
```bash
node bot.js --token <your-token>
```

You also need to deploy the commands (although only once). This is done by running
```bash
node bot.js -u
```
You still need to provide a token for this and the bot will start automatically after this.
