const express = require('express');
const router  = express.Router();

const pjson   = require("../package.json");

/* GET home page. */
router.get("/", (req, res) => {
  return res.render("index", {
    version: pjson.version,
    name: pjson.name,
    description: pjson.description,
    author: pjson.author,
  });
});

module.exports = router;
