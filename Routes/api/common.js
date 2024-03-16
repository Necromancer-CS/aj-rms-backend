const express = require("express");
const router = express.Router();

// Controllers
const { register, login, currentUser } = require("../../Controllers/auth");
// Middleware
const { auth, adminCheck } = require("../../Middleware/auth");

// Controllers
const { list, changeRole } = require("../../Controllers/user");

const {
  salesMonthly,
  totalOpenDesk,
  totalPrice,
  topPackage,
  topMenu,
} = require("../../Controllers/dashboard");

// http://localhost:5000/api/register
router.get("/", (req, res) => res.send("Express on Vercel"));
router.post("/register", register);
router.post("/login", login);
router.post("/current-user", auth, currentUser);
router.post("/current-admin", auth, adminCheck, currentUser);

router.get("/user", auth, adminCheck, list);
router.post("/change-role", auth, adminCheck, changeRole);

router.get("/dashboard-salesMonthly", salesMonthly);
router.get("/dashboard-totalOpenDesk", totalOpenDesk);
router.get("/dashboard-totalPrice", totalPrice);
router.get("/dashboard-topPackage", topPackage);
router.get("/dashboard-topMenu", topMenu);

module.exports = router;
