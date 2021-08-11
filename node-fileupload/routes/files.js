const debug    = require("debug")("node-fileupload:files");
const express  = require('express');
const router   = express.Router();
const config   = require("config");
const mongoose = require("mongoose");
const _        = require("lodash");

const multerStorage = require("../config/storage");
const File          = require("../models/File");

const DB_URI      = config.get("MONGO_URI");
const BUCKET_NAME = config.get("BUCKET_NAME");

const connection = mongoose.createConnection(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

let gridFsBucket;

connection.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: BUCKET_NAME });
});

router.post("/single", multerStorage.single("attachment"), async (req, res) => {
  try {
    debug(req.file);
    let { id, filename, bucketName, contentType } = req.file;
    let file = new File({
      fileId: id,
      filename,
      contentType,
      bucketName,
      createdAt: new Date(),
    });

    await file.save();
    return res.formatter.ok({ file });
  } catch (error) {
    debug(error);
    return res.formatter.badRequest(error.message || error.toString());
  }
});

router.post("/multiple", multerStorage.array("attachments", 4), async (req, res) => {
    try {
      debug(req.file);
      let { id, filename, bucketName, contentType } = req.file;
      let file = new File({
        fileId: id,
        filename,
        contentType,
        bucketName,
        createdAt: new Date(),
      });

      await file.save();
      return res.formatter.ok({ file });
    } catch (error) {
      return res.formatter.badRequest(error.message || error.toString());
    }
  }
);

router.get("/:filename", async (req, res) => {
  if (!gridFsBucket) {
    return res.formatter.serverError("DB connection not available");
  }

  try {
    let { filename } = req.params;
    let file = await File.findOne({ filename });

    if(_.isEmpty(file)) {
      throw new Error("File not found");
    }

    let stream = gridFsBucket.openDownloadStreamByName(filename);
    stream.read();

    const chunks = [];
    stream.on("data", (data) => {
      chunks.push(data);
    });

    stream.on("end", () => {
      const buffer = Buffer.concat(chunks);

      return res.formatter.ok({ file, buffer });
    });
    stream.on("error", (err) => {
      throw new Error(err);
    });
  } catch (error) {
    return res.formatter.badRequest(error.message || error.toString());
  }
});

module.exports = router;
