const express = require("express");
const router = express.Router();

const { listPackageIdMenu } = require("../../Controllers/manu");

const { upload } = require("../../Middleware/upload");

//http://localhost:5000/api/menu
//API สำหรับ UI ในส่วน Flow การทำงาน
router.get("/:id", listPackageIdMenu); //customerBookingId

module.exports = router;
