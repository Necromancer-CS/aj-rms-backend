const mongoose = require("mongoose");

const customerBookingSchema = mongoose.Schema(
  {
    userOpenTable: {
      type: String,
      default: "userOpenTable",
    },
    userBilling: {
      type: String,
      default: "userBilling",
    },
    qrLink: {
      type: String,
    },
    deskNo: {
      type: String,
    },
    countAdult: {
      type: Number,
      default: 0,
    },
    countChildreng: {
      type: Number,
      default: 0,
    },
    countChild: {
      type: Number,
      default: 0,
    },
    packageId: {
      type: String,
    },
    chanelPayment: {
      type: String,
      default: "Money",
    },
    file: {
      type: String,
      default: "noimage.jpg",
    },
    status: {
      type: String,
      default: "preparing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customerBooking", customerBookingSchema);
