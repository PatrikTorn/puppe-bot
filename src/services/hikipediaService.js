const axios = require("axios");
const {
  proxyUrl,
  randomFromList,
  getDocument,
  capitalizeString,
} = require("../tools");
const { alphabets } = require("../consts");

const getHikipediaRandomWord = async () => {
  let char1 = randomFromList(alphabets);
  let char2 = randomFromList(alphabets);
  const url = proxyUrl(
    `https://hiki.pedia.ws/wiki/Toiminnot:Kaikki_sivut?from=${char1}${char2}`
  );
  const res = await axios.get(url);
  var document = getDocument(res.data);
  const ps = document.querySelectorAll(".mw-allpages-body li a");
  let urls = [];
  for (let i in ps) {
    const href = ps[i] && ps[i].attributes && ps[i].attributes.href;
    if (href) {
      urls.push(ps[i].textContent);
    }
  }
  return randomFromList(urls);
};

const getHikipediaByName = async (query) => {
  try {
    if (!query) {
      const randomWord = await getHikipediaRandomWord();
      return await getHikipediaByName(randomWord);
    }
    const url = proxyUrl(
      `https://hikipedia.org/wiki/${encodeURIComponent(
        capitalizeString(query)
      )}`
    );
    console.log("! GET URL", url);
    const res = await axios.get(url);
    // console.log("Success", res);
    var document = getDocument(res.data);
    const ps = document.body.querySelectorAll(
      "div[class='mw-parser-output'] > p"
    );
    for (let i in ps) {
      const text = ps[i].textContent && ps[i].textContent.replace("\n", "");
      if (text) {
        return "*" + capitalizeString(query) + "*: " + text;
      }
    }
  } catch (e) {
    throw e;
  }
};

module.exports = { getHikipediaByName, getHikipediaRandomWord };
