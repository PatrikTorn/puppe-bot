const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const port = process.env.PORT || 3005;
const APP_URL = process.env.PORT
  ? "http://puppe-bot.herokuapp.com"
  : `http://localhost:${port}`;

const ERROR_MESSAGE = "sattuna erreys";

const MESSAGE_OPTIONS = {
  parse_mode: "Markdown",
};

module.exports = {
  alphabets,
  port,
  ERROR_MESSAGE,
  MESSAGE_OPTIONS,
};
