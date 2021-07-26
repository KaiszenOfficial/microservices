const debug   = require("debug")("url-shortner:url")
const express = require("express");
const router  = express.Router();

const shortid  = require("shortid");
const validUrl = require("valid-url");
const Url      = require("../models/Url");

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl || !validUrl.isUri(longUrl)) {
    return res.status(400).json("Please provide a valid URL.").end();
  }

  try {
    let url = await Url.findOne({ longUrl });

    if (url) {
      return res.status(200).json(url).end();
    } else {
      const baseUrl = req.protocol + "://" + req.get("host");
      const urlCode = shortid.generate();
      const shortUrl = new URL(urlCode, baseUrl);

      url = new Url({ urlCode, longUrl, shortUrl, date: new Date() });

      await url.save();

      return res.status(200).json(url).end();
    }
  } catch (error) {
    debug(error);
    return res.status(500).json(error).end();
  }
});

module.exports = router;
