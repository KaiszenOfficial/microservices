const express = require('express');
const router  = express.Router();
const config  = require("config");

const pjson = require("../package.json");

/* GET home page. */
router.get("/", function (req, res, next) {

  let mailTemplates = config.get("templates");

  res.render("index", {
    displayName: pjson.displayName,
    version: pjson.version,
    description: pjson.description,
    author: pjson.author,
    mailTemplates
  });
});

module.exports = router;
