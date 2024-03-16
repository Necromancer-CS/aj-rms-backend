const express = require("express");
const router = express.Router();

const {
  createCustomerBooking,
  readCustomerBooking,
  updateStatus,
  list,
  update,
  remove,
} = require("../Controllers/CustomerBooking");

//http://localhost:5000/api/customer-booking
//API สำหรับ UI ในส่วน Flow การทำงาน
router.post("/customer-booking", createCustomerBooking);
router.get("/customer-booking/:id", readCustomerBooking);
router.put("/customer-booking/:id", updateStatus);

//API สำหรับ UI ในส่วน จัดการข้อมูล customerBooking
router.get("/customer-booking-control", list);
router.put("/customer-booking-control/:id", update);
router.delete("/customer-booking-control/:id", remove);

module.exports = router;
