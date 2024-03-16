const express = require("express");
const router = express.Router();

const {
  listPackageIdMenu,
  list,
  read,
  create,
  update,
  remove,
} = require("../Controllers/manu");

const { upload } = require("../Middleware/upload");

//http://localhost:5000/api/menu
//API สำหรับ UI ในส่วน Flow การทำงาน
router.get("/menu/:id", listPackageIdMenu); //customerBookingId

//API สำหรับ UI ในส่วน จัดการข้อมูล billing
router.get("/menu-control", list);
router.get("/menu-control/:id", read);
router.post("/menu-control", upload, create);
router.put("/menu-control/:id", upload, update);
router.delete("/menu-control/:id", remove);

module.exports = router;
