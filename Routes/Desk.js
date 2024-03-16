const express = require("express");
const router = express.Router();

const { list, read, create, update, remove } = require("../Controllers/Desk");

//http://localhost:5000/api/dask
router.get("/desk", list);
router.get("/desk/:id", read);
router.post("/desk", create);
router.put("/desk/:id", update);
router.delete("/desk/:id", remove);

module.exports = router;
