const {
  getPageIdBySearch,
  getLinkTitleByPageId,
  getMarkdownByPageId,
  findRandomWikipedia,
} = require("../services/wikipediaService");
const { ERROR_MESSAGE } = require("../consts");
const { getUrbaaniByName } = require("../services/urbaaniService");
const { findOrRandomIntti } = require("../services/inttiService");
const { getHikipediaByName } = require("../services/hikipediaService");
const { randomFromList } = require("../tools");

async function juonto(msg, match) {
  const query = match[1];
  try {
    if (!query) {
      return await randomFromList([
        findRandomWikipedia,
        getHikipediaByName,
        getUrbaaniByName,
        findOrRandomIntti,
      ])();
    }
    const pageId = await getPageIdBySearch(query, true);
    const randomLinkTitle = await getLinkTitleByPageId(pageId);
    const linkPageId = await getPageIdBySearch(randomLinkTitle, true);
    const markdown = await getMarkdownByPageId(linkPageId);
    return markdown;
    //   bot.sendMessage(chatId, markdown, {
    //     parse_mode: "Markdown",
    //   });
  } catch (e) {
    console.log(e);
    return ERROR_MESSAGE;
    //   bot.sendMessage(chatId, );
    //   console.log("Erreys", e);
  }
}

async function wiki(msg, match) {
  const query = (match[1] || "").trim();
  try {
    if (!query) {
      return await findRandomWikipedia();
    }
    const pageId = await getPageIdBySearch(query, true);
    const markdown = await getMarkdownByPageId(pageId);
    return markdown;
  } catch (e) {
    console.log(e);
    return ERROR_MESSAGE;
  }
}

module.exports = {
  juonto,
  wiki,
};
