const express = require("express");
const router = express.Router();

const {
  createCustomerBooking,
  readCustomerBooking,
  updateStatus,
} = require("../../Controllers/CustomerBooking");

//http://localhost:5000/api/customer-booking
//API สำหรับ UI ในส่วน Flow การทำงาน
router.post("/", createCustomerBooking);
router.get("/:id", readCustomerBooking);
router.put("/:id", updateStatus);

module.exports = router;
