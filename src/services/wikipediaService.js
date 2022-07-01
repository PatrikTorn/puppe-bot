const axios = require("axios");
const { htmlToMarkdown, randomFromList, truncate } = require("../tools");

const getPageIdBySearch = async (query, takeFirst) => {
  try {
    const optionsRes = await axios.get(
      `https://fi.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${encodeURIComponent(
        query
      )}`
    );
    const list = optionsRes.data.query.search;
    const optionEntity = takeFirst ? list[0] : randomFromList(list);
    const pageId = optionEntity && optionEntity.pageid;
    return pageId;
  } catch (e) {
    throw e;
  }
};

const getLinkTitleByPageId = async (pageId) => {
  try {
    // Alternative linkshere
    const linksRes = await axios.get(
      `https://fi.wikipedia.org/w/api.php?action=query&prop=links&format=json&utf8=&pllimit=max&exintro=&pageids=${pageId}`
    );
    const links = Object.values(linksRes.data.query.pages)[0].links;
    const randomLinkTitle = randomFromList(links).title;
    return randomLinkTitle;
  } catch (e) {
    throw e;
  }
};

const getMarkdownByPageId = async (pageId) => {
  try {
    let res = await axios.get(
      `https://fi.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&utf8=&exintro=&pageids=${pageId}`
    );
    const obj = Object.values(res.data.query.pages)[0];
    const _html = obj.extract;
    const title = obj.title;
    return `*${title}:* ` + truncate(htmlToMarkdown(_html), 1000, true);
  } catch (e) {
    throw e;
  }
};

const findRandomWikipedia = async () => {
  const url =
    "https://fi.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json";
  const res = await axios.get(url);
  const title = Object.values(res.data.query.random)[0].title;
  const pageId = await getPageIdBySearch(title);
  return await getMarkdownByPageId(pageId);
};

module.exports = {
  getPageIdBySearch,
  getLinkTitleByPageId,
  getMarkdownByPageId,
  findRandomWikipedia,
};
