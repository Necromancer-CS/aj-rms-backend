const express = require("express");
const router = express.Router();

const {
  listByStatusOrderMenu,
  updateStatusOrderMenu,
  listOrderMenu,
  createOrderMenu,
  list,
  update,
} = require("../Controllers/CustomerOrderMenu");

//http://localhost:5000/api/order-menu
//API สำหรับ UI ในส่วน Flow การทำงาน
router.get("/order-menu", listByStatusOrderMenu);
router.get("/order-customer/:id", listOrderMenu); // id ของ CoutomerBooking
router.put("/order-menu/:id", updateStatusOrderMenu);
router.post("/order-menu", createOrderMenu);

//API สำหรับ UI ในส่วน จัดการข้อมูล billing
router.get("/order-menu-control", list);
router.put("/order-menu-control/:id", update);

module.exports = router;
