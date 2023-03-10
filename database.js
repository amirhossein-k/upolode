"use strict";

const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/upload-files-database", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Mongodb......"));
};
