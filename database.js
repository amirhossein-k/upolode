"use strict";

const mongoose = require("mongoose");

// module.exports = () => {
//   mongoose
//     .connect("mongodb://127.0.0.1:27017/upload-files-database", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => console.log("Connected to Mongodb......"));
// };
// module.exports = () => {
//   mongoose
//     .connect("mongodb://root:nwSFh1bOJAFA2zI3lOhSZ4GP@alfie.iran.liara.ir:33611/my-app?authSource=admin", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => console.log("Connected to Mongodb......"));
// };
module.exports = () => {
  mongoose
    .connect("mongodb://root:nwSFh1bOJAFA2zI3lOhSZ4GP@alfie.iran.liara.ir:33611/my-app?authSource=admin", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Mongodb......"));
};
