const mongoose = require("mongoose");

const deskSchema = mongoose.Schema(
  {
    deskNo: {
      type: String,
    },
    deskStatus: {
      type: String,
      default: "ready",
    },
    chairCount: {
      type: Number,
      default: 0,
    },
    customerBookingId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("desk", deskSchema);
