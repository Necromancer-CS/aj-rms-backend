const express = require("express");
const router = express.Router();

const {
  listBilling,
  readBilling,
  createBilling,
  updateBilling,
  list,
  remove,
} = require("../Controllers/Billing");

//http://localhost:5000/api/billing
//API สำหรับ UI ในส่วน Flow การทำงาน
router.get("/billing", listBilling);
router.get("/billing/:id", readBilling);
router.post("/billing", createBilling);
router.put("/billing/:id", updateBilling);

//http://localhost:5000/api/billing-control
//API สำหรับ UI ในส่วน จัดการข้อมูล billing
router.get("/billing-control", list);
router.delete("/billing-control/:id", remove);

module.exports = router;
