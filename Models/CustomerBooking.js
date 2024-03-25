const mongoose = require("mongoose");

const customerBookingSchema = mongoose.Schema(
  {
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
      default: "N",
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
