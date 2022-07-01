const axios = require("axios");
const { capitalizeString, getDocument } = require("../tools");

const getUrbaaniByName = async (query) => {
  try {
    const url = query
      ? `https://urbaanisanakirja.com/word/${encodeURIComponent(
          query.replace("ä", "a").replace("ö", "o")
        )}`
      : "https://urbaanisanakirja.com/random";
    console.log("! GET URL", url);
    const res = await axios.get(url);
    var document = getDocument(res.data);
    const title = document.body.querySelector(".box-container p")?.textContent;
    const name = document.body.querySelector(
      ".box-container a h1"
    )?.textContent;
    const blockquote = document.body
      .querySelector(".box-container blockquote")
      ?.textContent.trim();
    return (
      "*" +
      capitalizeString(query || name) +
      "*: " +
      title +
      (blockquote ? "\n\n _ " + blockquote + "_" : null)
    );
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getUrbaaniByName,
};
