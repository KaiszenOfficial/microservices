const mongoose       = require("mongoose");
const bcrypt         = require("bcrypt");
const config         = require("config");
const { v4: uuidv4 } = require("uuid");

const SALT_ROUNDS = config.get("SALT_ROUNDS")

const userSchema = new mongoose.Schema(
  {
    _id: String,
    userId: {
      type: String,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    username: {
      type: String,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email name is required."],
      validate: {
        validator: function (e) {
          return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            e
          );
        },
        message: (props) => `${props.value} is not a valid email address.`,
      },
      index: true,
    },
    password: {
      type: String,
      min: [6, "Password must be minimum 6 characters long."],
      required: [true, "Password is required."],
    },
    avatar: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isNew) {
    this.updatedAt = new Date();
    return next();
  }

  try {
    const SALT    = bcrypt.genSaltSync(SALT_ROUNDS);
    const pwdHash = bcrypt.hashSync(this.password, SALT);

    this.password  = pwdHash;
    this.userId    = this._id       = uuidv4().replace(/\-/g, "");
    this.createdAt = this.updatedAt = new Date();
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function(userPassword) {
	return bcrypt.compareSync(userPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);
