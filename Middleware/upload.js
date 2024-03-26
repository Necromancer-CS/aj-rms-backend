const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "RSDB-" + uniqueSuffix + file.originalname).catch(function (
      error
    ) {
      console.log("past Image");
      console.log(error);
    });
  },
});

exports.upload = multer({ storage: storage }).single("file");
