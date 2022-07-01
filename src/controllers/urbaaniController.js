const { ERROR_MESSAGE } = require("../consts");
const { getUrbaaniByName } = require("../services/urbaaniService");

async function urbaani(msg, match) {
  const query = (match[1] || "").trim();
  try {
    return await getUrbaaniByName(query);
  } catch (e) {
    console.log(e);
    return ERROR_MESSAGE;
  }
}

module.exports = {
  urbaani,
};
