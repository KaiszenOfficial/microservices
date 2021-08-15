const express = require("express");
const router  = express.Router();

const { shortenUrl } = require("../controllers/url.controller");

router.post("/shorten", shortenUrl);

module.exports = router;
