const debug   = require("debug")("url-shortner:url")
const express = require("express");
const router  = express.Router();

const shortid  = require("shortid");
const validUrl = require("valid-url");
const Url      = require("../models/Url");

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  debug(longUrl);
  if (!longUrl || !validUrl.isUri(longUrl)) {
    return res.formatter.badRequest("Please provide a valid URL.", {
      timestamp: new Date(),
      code: "INAVLID_URL",
      path: req.path,
    });
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

      return res.formatter.ok(url);
    }
  } catch (error) {
    debug(error);
    res.formatter.badRequest(error.message || error.toString(), {
      timestamp: new Date(),
      code: "INTTERNAL_SERVER_ERROR",
      path: req.path,
    });
  }
});

module.exports = router;
