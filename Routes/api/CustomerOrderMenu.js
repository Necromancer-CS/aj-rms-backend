const express = require("express");
const router = express.Router();

const {
  listByStatusOrderMenu,
  updateStatusOrderMenu,
  listOrderMenu,
  createOrderMenu,
} = require("../../Controllers/CustomerOrderMenu");

//http://localhost:5000/api/order-menu
//API สำหรับ UI ในส่วน Flow การทำงาน
router.get("/", listByStatusOrderMenu);
router.get("/:id", listOrderMenu); // id ของ CoutomerBooking
router.put("/:id", updateStatusOrderMenu);
router.post("/", createOrderMenu);

module.exports = router;
