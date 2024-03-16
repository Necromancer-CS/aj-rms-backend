const express = require("express");
const router = express.Router();

const {
  list,
  read,
  create,
  update,
  remove,
} = require("../Controllers/ChannelPayment");

//http://localhost:5000/api/channel-payment
router.get("/channel-payment", list);
router.get("/channel-payment/:id", read);
router.post("/channel-payment", create);
router.put("/channel-payment/:id", update);
router.delete("/channel-payment/:id", remove);

module.exports = router;
