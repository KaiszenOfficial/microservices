const express = require("express");
const router  = express.Router();

const { validateAuthToken } = require("../utils/authManager");
const { getUser }           = require("../controllers/user.controller");

router.use(validateAuthToken);

router.get("/", getUser);

module.exports = router;
