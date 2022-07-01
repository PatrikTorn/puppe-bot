const { ERROR_MESSAGE } = require("../consts");
const { findOrRandomIntti } = require("../services/inttiService");

async function intti(msg, match) {
  const query = (match[1] || "").trim();
  try {
    return await findOrRandomIntti(query);
  } catch (e) {
    console.log(e);
    return ERROR_MESSAGE;
  }
}

module.exports = {
  intti,
};
