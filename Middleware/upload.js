const multer = require("multer");
const path = require("path");
const pathToUpload = path.join(process.cwd(), "/uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
<<<<<<< HEAD
    try {
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
=======
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "RSDB-" + uniqueSuffix + file.originalname);
>>>>>>> c35a3da8b4cd09b2cdff789dcc5b73f77384b747
  },
});

exports.upload = multer({ storage: storage }).single("file");
