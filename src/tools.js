const jsdom = require("jsdom");
const TurndownService = require("turndown");

function capitalizeString(str) {
  return str
    .split(" ")
    .map((element) => {
      return (
        element.charAt(0).toUpperCase() + element.substring(1).toLowerCase()
      );
    })
    .join(" ");
}

function randomFromList(list) {
  let min = 0;
  let max = list.length - 1;
  // find diff
  let difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  return list[rand];
}

const truncate = (str, n, useWordBoundary) => {
  if (str.length <= n) {
    return str;
  }
  const subString = str.substr(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf("\n"))
      : subString) + "..."
  );
};

function getDocument(text) {
  const dom = new jsdom.JSDOM(text);
  return dom.window.document;
}

function proxyUrl(url) {
  return `https://patriktorn.fi/hupi.php?url=${url}`;
}

function htmlToMarkdown(html) {
  const turndownService = new TurndownService();
  return turndownService.turndown(html);
}

module.exports = {
  randomFromList,
  capitalizeString,
  truncate,
  getDocument,
  proxyUrl,
  htmlToMarkdown,
};
