const debug  = require("debug")("node-auth:auth-manager");
const jwt    = require("jsonwebtoken");
const config = require("config");

const secret    = config.get("secret");
const expiresIn = config.get("expiresIn");
const issuer    = config.get("issuer");

const User = require("../models/User");

exports.generateAuthToken = (userId, firstName, lastName, username, email) => {
  const payload = {
    firstName,
    lastName,
    username,
    email,
  };

  const options = {
    expiresIn,
    issuer,
    audience: userId,
  };

  return jwt.sign(payload, secret, options);
};

exports.validateAuthToken = (req, res, next) => {
  var token = req.headers["x-auth-token"];

  if (!token)
    return res.formatter.unauthorized("Missing authentication token", {
      code: config.get("errorCodes").missingToken,
    });

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      if(err instanceof jwt.TokenExpiredError){
        return res.formatter.unauthorized(err.toString(), {
          code: config.get("errorCodes").unauthorized,
        });
      }

      return res.formatter.serverError(err.message || err.toString(), {
        code: config.get("errorCodes").serverError,
      });
    }

    let user = await User.findOne({ email: decoded.email });
    req.user = user;

    next();
  });
};