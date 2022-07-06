const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
require("dotenv").config();

const { port, MESSAGE_OPTIONS } = require("./consts");
const { juonto, wiki } = require("./controllers/wikipediaController");
const { hupi } = require("./controllers/hikipediaController");
const { urbaani } = require("./controllers/urbaaniController");
const { intti } = require("./controllers/inttiController");

// Telegram bot api

const bot = new TelegramBot(process.env.API_TOKEN, { polling: true });

bot.onText(/\/juonto(\s.+)?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const markdown = await juonto(msg, match);
  bot.sendMessage(chatId, markdown, MESSAGE_OPTIONS);
});

bot.onText(/\/(?:wiki|tarkka)(\s.+)?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const markdown = await wiki(msg, match);
  bot.sendMessage(chatId, markdown, MESSAGE_OPTIONS);
});

bot.onText(/\/hupi(\s.+)?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const markdown = await hupi(msg, match);
  bot.sendMessage(chatId, markdown, MESSAGE_OPTIONS);
});

bot.onText(/\/urbaani(\s.+)?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const markdown = await urbaani(msg, match);
  bot.sendMessage(chatId, markdown, MESSAGE_OPTIONS);
});

bot.onText(/\/intti(\s.+)?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const markdown = await intti(msg, match);
  bot.sendMessage(chatId, markdown, MESSAGE_OPTIONS);
});

// HTTP Api

const app = express();

// Keeps server alive, request every 30 minutes http://kaffeine.herokuapp.com/
app.get("/", (req, res) => {
  console.log("!! GET /");
  res.json("OK");
});

app.listen(port, () => console.log("!! Server listening on port", port));
