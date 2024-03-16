const express = require("express");
const router = express.Router();

const {
  list,
  read,
  create,
  update,
  remove,
} = require("../../Controllers/Desk");

//http://localhost:5000/api/dask
router.get("/", list);
router.get("/:id", read);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
