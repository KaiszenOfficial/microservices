const debug            = require('debug')('node-auth:auth-controller');
const _                = require('lodash');
const shortid          = require('shortid');
const config           = require('config');
const { createAvatar } = require('@dicebear/avatars');
const style            = require('@dicebear/avatars-initials-sprites');

const User                  = require('../models/User');
const { generateAuthToken } = require('../utils/authManager');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (_.isEmpty(user)) {
      return res.formatter.unauthorized('Invalid credentials.', {
        timestamp: new Date(),
        code: config.get('ERROR_CODES').USER_NOT_FOUND,
        path: req.path,
      });
    }

    if (!user.comparePassword(password)) {
      return res.formatter.unauthorized('Invalid credentials.', {
        timestamp: new Date(),
        code: config.get('ERROR_CODES').USER_NOT_FOUND,
        path: req.path,
      });
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
    return res.formatter.serverError(error.message || error.toString(), {
      timestamp: new Date(),
      code: config.get('ERROR_CODES').INTERNAL_SERVER_ERROR,
      path: req.path,
    });
  }
};

const register = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!_.isEmpty(user)) {
      return res.formatter.badRequest('User already exists', {
        timestamp: new Date(),
        code: config.get('ERROR_CODES').DUPLICATE_USER,
        path: req.path,
      });
    }

    const svg = createAvatar(style, {
      seed: [firstName, lastName].join(' '),
      height: 256,
      width: 256
    });

    const avatar = svg.replace(/\\/g,"");

    user = new User({
      firstName,
      lastName,
      username: _.isEmpty(username)
        ? [firstName, shortid.generate()].join('.')
        : username,
      email,
      password,
      avatar,
    });

    const savedUser = await user.save();

    return res.formatter.created({ user: savedUser });
  } catch (error) {
    debug(error);
    return res.formatter.serverError(error.message || error.toString(), {
      timestamp: new Date(),
      code: config.get('ERROR_CODES').INTERNAL_SERVER_ERROR,
      path: req.path,
    });
  }
};

module.exports = { login, register };
