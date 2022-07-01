const { randomFromList } = require("../tools");
const inttiResources = require("../resources/inttiResources.json");

const findOrRandomIntti = (query) => {
  console.log("Find or random intti", query);
  const inttiList = Object.entries(inttiResources);
  let [key, value] = randomFromList(inttiList);
  const found =
    query &&
    inttiList.find(([key, value]) => key.toLowerCase() === query.toLowerCase());
  if (found) {
    key = query;
    value = found[1];
  }
  return (text = "*" + key + ":* " + value);
};

module.exports = {
  findOrRandomIntti,
};
