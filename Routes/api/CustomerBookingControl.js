const express = require("express");
const router = express.Router();

const {
  list,
  update,
  remove,
} = require("../../Controllers/CustomerBooking");

//API สำหรับ UI ในส่วน จัดการข้อมูล customerBooking
router.get("/", list);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
