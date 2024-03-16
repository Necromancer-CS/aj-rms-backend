const mongoose = require("mongoose");

const customerOrderMenuSchema = mongoose.Schema(
  {
    menuId: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    deskNo: {
      type: String,
    },
    customerBookingId: {
      type: String,
    },
    status: {
      type: String,
      default: "notServed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customerOrderMenu", customerOrderMenuSchema);
