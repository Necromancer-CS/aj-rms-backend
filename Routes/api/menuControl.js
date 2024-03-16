const express = require("express");
const router = express.Router();

const {
  list,
  read,
  create,
  update,
  remove,
} = require("../../Controllers/manu");

const { upload } = require("../../Middleware/upload");

//API สำหรับ UI ในส่วน จัดการข้อมูล billing
router.get("/", list);
router.get("/:id", read);
router.post("/", upload, create);
router.put("/:id", upload, update);
router.delete("/:id", remove);

module.exports = router;
