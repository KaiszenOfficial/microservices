const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    fileId: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    bucketName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      default: Date.now,
    },
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

module.exports = mongoose.model("File", fileSchema);
