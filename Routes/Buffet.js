const express = require("express");
const router = express.Router();

const { list, read, create, update, remove } = require("../Controllers/Buffet");

//http://localhost:5000/api/buffet
router.get("/buffet", list);
router.get("/buffet/:id", read);
router.post("/buffet", create);
router.put("/buffet/:id", update);
router.delete("/buffet/:id", remove);

module.exports = router;
