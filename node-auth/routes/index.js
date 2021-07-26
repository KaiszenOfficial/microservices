const express = require('express');
const router  = express.Router();
const pjson   = require("../package.json");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.formatter.ok({ version: pjson.version, name: pjson.name, description: pjson.description })
});

module.exports = router;
