const express = require("express");
const router = express.Router();

const {
  listBilling,
  readBilling,
  createBilling,
  updateBilling,
} = require("../../Controllers/Billing");

//http://localhost:5000/api/billing
//API สำหรับ UI ในส่วน Flow การทำงาน
router.get("/", listBilling);
router.get("/:id", readBilling);
router.post("", createBilling);
router.put("/:id", updateBilling);

module.exports = router;
