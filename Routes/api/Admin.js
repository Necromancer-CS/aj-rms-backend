const express = require("express");
const router = express.Router();

const {
  list,
  read,
  create,
  update,
  remove,
} = require("../../Controllers/Admin");

//http://localhost:5000/api/admin
router.get("/", list);
router.get("/:id", read);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
