const pjson = require("../package.json");

const main = (req, res) => {
  return res.render("index", {
    displayName: pjson.displayName,
    version: pjson.version,
    description: pjson.description,
    author: pjson.author,
  });
};

module.exports = { main }