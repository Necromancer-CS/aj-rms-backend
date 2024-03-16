const express = require("express");
const router = express.Router();
const {
  salesMonthly,
  totalOpenDesk,
  totalPrice,
  topPackage,
  topMenu,
} = require("../Controllers/dashboard");
//http://localhost:5000/api/
router.get("/dashboard-salesMonthly", salesMonthly);
router.get("/dashboard-totalOpenDesk", totalOpenDesk);
router.get("/dashboard-totalPrice", totalPrice);
router.get("/dashboard-topPackage", topPackage);
router.get("/dashboard-topMenu", topMenu);

module.exports = router;
