const debug  = require("debug")("node-auth:auth-manager");
const jwt    = require("jsonwebtoken");
const config = require("config");

const JWT_SECRET    = config.get("JWT_SECRET");
const JWT_EXPIRES_IN = config.get("JWT_EXPIRES_IN");
const JWT_ISSUER    = config.get("JWT_ISSUER");

const User = require("../models/User");

exports.generateAuthToken = (userId, firstName, lastName, username, email) => {
  const payload = {
    firstName,
    lastName,
    username,
    email,
  };

  const options = {
    expiresIn: JWT_EXPIRES_IN,
    issuer: JWT_ISSUER,
    audience: userId,
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

exports.validateAuthToken = (req, res, next) => {
  var token = req.headers["x-auth-token"];

  if (!token)
    return res.formatter.unauthorized("Missing authentication token", {
      code: config.get("ERROR_CODES").MISSING_TOKEN,
    });

  jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      debug(err);
      if(err instanceof jwt.TokenExpiredError){
        return res.formatter.unauthorized(err.toString(), {
          code: config.get("ERROR_CODES").UNAUTHORIZED,
        });
      }

      return res.formatter.serverError(err.message || err.toString(), {
        code: config.get("ERROR_CODES").INTERNAL_SERVER_ERROR,
      });
    }

    let user = await User.findOne({ email: decoded.email });
    req.user = user;

    next();
  });
};