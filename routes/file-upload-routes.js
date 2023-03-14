"use strict";

const express = require("express");
const { upload } = require("../helpers/filehelper");
const {
  singleFileUpload,
  multipleFileUpload,
  getallSingleFiles,
  getallMultipleFiles,
  deleteSingleFile,deleteMultipleFile,updateMultipleFile,updateSingleFile
} = require("../controllers/fileuploaderController");
const router = express.Router();

router.post("/singleFile", upload.single("file"), singleFileUpload);
router.post("/multipleFiles", upload.array("files"), multipleFileUpload);
// router.post("/multipleFiles", upload.fields([{name:'files'},{name:'title'}]), multipleFileUpload);
router.get("/getSingleFiles", getallSingleFiles);
router.get("/getMultipleFiles", getallMultipleFiles);
router.delete("/deleteSingleFile", deleteSingleFile);
router.delete("/deleteMultipleFile", deleteMultipleFile);
router.put("/updateMultipleFile",upload.array("files"), updateMultipleFile);
router.put("/updateSingleFile",upload.single("file"), updateSingleFile);

module.exports = {
  router: router,
};
