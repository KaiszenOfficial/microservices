const express = require('express');
const router  = express.Router();

const pjson = require("../package.json");

const Url = require("../models/Url");

router.get("/", (req, res) => {
  return res.render("index", {
    name: pjson.name,
    version: pjson.version,
    description: pjson.description,
    author: pjson.author,
  });
});

router.get("/:code", async (req, res) => {
  let urlCode = req.params.code;

  try {
    const url = await Url.findOne({ urlCode });

    if (!url) {
      return res.status(404).json("No URL Found.").end();
    }

    res.redirect(url.longUrl);
  } catch (error) {
    return res.status(500).json(error).end();
  }
});

module.exports = router;
