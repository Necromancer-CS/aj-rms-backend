const express = require("express");
const router = express.Router();

const { list, update } = require("../../Controllers/CustomerOrderMenu");

//API สำหรับ UI ในส่วน จัดการข้อมูล billing
router.get("/", list);
router.put("/:id", update);

module.exports = router;
