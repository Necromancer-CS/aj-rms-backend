const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      cb(null, "./uploads/");
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
