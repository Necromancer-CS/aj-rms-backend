const { log } = require("console");
const multer = require("multer");
const path = require("path");
const pathToUpload = path.join(process.cwd(), "/tmp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      console.log("PathToUpload " + pathToUpload);
      cb(null, pathToUpload);
    } catch (error) {
      console.log("past Upload");
      console.log(error);
    }
  },
  filename: function (req, file, cb) {
    try {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, "RSDB-" + uniqueSuffix + file.originalname);
    } catch (error) {
      console.log("past Image");
      console.log(error);
    }
  },
});

exports.upload = multer({ storage: storage }).single("file");
