const express = require('express');
const router  = express.Router();

const { main } = require('../controllers/main.controller');

/* GET home page. */
router.get("/", main);

module.exports = router;
