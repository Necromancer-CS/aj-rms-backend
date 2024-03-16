const express = require("express");
const router = express.Router();

const { listOrderMenu } = require("../../Controllers/CustomerOrderMenu");

//API สำหรับ UI ในส่วน จัดการข้อมูล billing
router.get("/:id", listOrderMenu);

module.exports = router;
