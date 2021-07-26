const express = require("express");
const router  = express.Router();

const { validateAuthToken } = require("../utils/auth-manager");

router.use(validateAuthToken);

router.get("/", (req, res) => {
  return res.formatter.ok({ user: req.user });
});

module.exports = router;
