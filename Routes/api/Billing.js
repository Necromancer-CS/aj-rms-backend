const express = require("express");
const router = express.Router();

const {
  listBilling,
  readBilling,
  createBilling,
  updateBilling,
  list,
  remove,
} = require("../../Controllers/Billing");

//http://localhost:5000/api/billing
//API สำหรับ UI ในส่วน Flow การทำงาน
router.get("/", listBilling);
router.get("/:id", readBilling);
router.post("", createBilling);
router.put("/:id", updateBilling);

//http://localhost:5000/api/billing-control
//API สำหรับ UI ในส่วน จัดการข้อมูล billing
router.get("/billing-control", list);
router.delete("/billing-control/:id", remove);

module.exports = router;
