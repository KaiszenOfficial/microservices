const express = require('express');
const router  = express.Router();

const { main } = require('../controllers/main.controller');
const { getUrlByCode } = require('../controllers/url.controller');

router.get("/", main);
router.get("/:code", getUrlByCode);

module.exports = router;
