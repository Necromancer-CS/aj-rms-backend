const express = require("express");
const router = express.Router();

// Controllers
const { login, currentUser } = require("../../Controllers/auth");

// Middleware
const { auth, adminCheck } = require("../../Middleware/auth");

// Controllers
const { list, changeRole } = require("../../Controllers/user");

const {
  readCustomerBooking,
  readQrCode,
} = require("../../Controllers/CustomerBooking");

const {
  totalPriceForDay,
  totalPriceForWeek,
  totalPriceForMonth,
  totalPriceForYear,
  totalPriceForMonthSegments,
  packageSelectionInMonth,
  totalPrice,
  topPackage,
  topMenu,
} = require("../../Controllers/dashboard");

const {
  updateCheckPaymentCustomerBooking,
} = require("../../Controllers/CustomerBooking");

const { upload } = require("../../Middleware/upload");

// http://localhost:5000/api/register
router.get("/", (req, res) => res.send("Express on Vercel"));
router.post("/login", login);
router.post("/current-user", auth, currentUser);
router.post("/current-admin", auth, adminCheck, currentUser);

router.get("/user", auth, adminCheck, list);
router.post("/change-role", auth, adminCheck, changeRole);

router.get("/dashboard-totalPriceForDay", totalPriceForDay);
router.get("/dashboard-totalPriceForWeek", totalPriceForWeek);
router.get("/dashboard-totalPriceForMonth", totalPriceForMonth);
router.get("/dashboard-totalPriceForYear", totalPriceForYear);
router.get("/dashboard-totalPriceForMonthSegments", totalPriceForMonthSegments);
router.get("/dashboard-packageSelectionInMonth", packageSelectionInMonth);

router.get("/dashboard-totalPrice", totalPrice);
router.get("/dashboard-topPackage", topPackage);
router.get("/dashboard-topMenu", topMenu);

router.put("/check-payment/:id", upload, updateCheckPaymentCustomerBooking);

router.get("/qr-code/:id", readQrCode);

module.exports = router;
