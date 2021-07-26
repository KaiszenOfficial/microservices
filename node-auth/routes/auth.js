const debug          = require("debug")("node-auth:auth");
const express        = require("express");
const router         = express.Router();
const _              = require("lodash");
const shortid        = require("shortid");
const config         = require("config");
const { v4: uuidv4 } = require("uuid");

const User                  = require("../models/User");
const { generateAuthToken } = require("../utils/auth-manager");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (_.isEmpty(user)) {
      return res.formatter.unauthorized("Invalid credentials.", { code: config.get("errorCodes").userNotFound });
    }

    if (!user.comparePassword(password)) {
      return res.formatter.unauthorized("Invalid credentials.", { code: config.get("errorCodes").userNotFound });
    }

    const token = generateAuthToken(
      user.userId,
      user.firstName,
      user.lastName,
      user.username,
      user.email
    );

    return res.formatter.ok({ token, user });
  } catch (error) {
    debug(error);
    return res.formatter.serverError(error.message || error.toString(), { code: config.get("errorCodes").serverError });
  }
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!_.isEmpty(user)) {
      return res.formatter.badRequest("User already exists", { code: config.get("errorCodes").duplicateUser });
    }

    user = new User({
      userId: uuidv4(),
      firstName,
      lastName,
      username: _.isEmpty(username)
        ? [firstName, shortid.generate()].join("#")
        : username,
      email,
      password,
    });

    const savedUser = await user.save();

    return res.formatter.created({ user: savedUser });
  } catch (error) {
    debug(error);
    return res.formatter.serverError(error.message || error.toString(), { code: config.get("errorCodes").serverError });
  }
});

module.exports = router;
