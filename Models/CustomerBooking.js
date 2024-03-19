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
    },
    countChildreng: {
      type: Number,
    },
    countChild: {
      type: Number,
    },
    packageId: {
      type: String,
    },
    status: {
      type: String,
      default: "preparing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customerBooking", customerBookingSchema);
