"use strict";

const express = require("express");
const { upload } = require("../helpers/filehelper");
const {
  singleFileUpload,
  multipleFileUpload,
  getallSingleFiles,
  getallMultipleFiles,
  deleteSingleFile,deleteMultipleFile,updateSingleFile
} = require("../controllers/fileuploaderController");
const router = express.Router();

router.post("/singleFile", upload.single("file"), singleFileUpload);
router.post("/multipleFiles", upload.array("files"), multipleFileUpload);
router.get("/getSingleFiles", getallSingleFiles);
router.get("/getMultipleFiles", getallMultipleFiles);
router.delete("/deleteSingleFile", deleteSingleFile);
router.delete("/deleteMultipleFile", deleteMultipleFile);
router.put("/updateSingleFile", updateSingleFile);

module.exports = {
  router: router,
};
