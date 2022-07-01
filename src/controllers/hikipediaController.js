const { ERROR_MESSAGE } = require("../consts");
const { getHikipediaByName } = require("../services/hikipediaService");

async function hupi(msg, match) {
  const query = (match[1] || "").trim();
  try {
    const text = await getHikipediaByName(query);
    if (!text) throw new Error();
    return text;
  } catch (e) {
    console.log(e);
    return ERROR_MESSAGE;
  }
}

module.exports = {
  hupi,
};
