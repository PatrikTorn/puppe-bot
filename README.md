# Puppe bot

## Getting started

Requirements: Node.js, npm, GIT

- Change name of .env.example to .env and set env variable API_TOKEN to real bot's token.

```
git clone https://github.com/PatrikTorn/puppe-bot.git
cd puppe-bot
npm install yarn
yarn install
yarn start
```

## Functionality - Toiminnallisuus (in Finnish)

- /juonto {aihe} - Juonto jostain aiheesta
- /wiki {aihe} - Etsi wikipediasta tieto
- /hupi {aihe} - Etsi hikipediasta tieto
- /urbaani {aihe} - Etsi urbaanista sanakirjasta tieto
- /intti {aihe} - Etsi inttisanakirjasta aihe
- **(Botin metodeissa haetaan satunnainen aihe ilman syötettyä aihetta.)**

## Deployment

- Bot is deployed to Heroku.

```
heroku login
git push heroku master
yarn start-server
```
