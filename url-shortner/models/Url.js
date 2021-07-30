const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: { type: String, default: Date.now },
  },
  {
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("Url", urlSchema);
