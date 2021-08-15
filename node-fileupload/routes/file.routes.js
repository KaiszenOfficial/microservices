const debug   = require("debug")("node-fileupload:files");
const express = require("express");
const router  = express.Router();

const multerStorage = require("../config/storage");

const {
  uploadSingleFile,
  uploadMultipleFiles,
  getFileByFilename,
} = require("../controllers/file.controller");

router.post("/single", multerStorage.single("attachment"), uploadSingleFile);

router.post(
  "/multiple",
  multerStorage.array("attachments", 4),
  uploadMultipleFiles
);

router.get("/:filename", getFileByFilename);

module.exports = router;
