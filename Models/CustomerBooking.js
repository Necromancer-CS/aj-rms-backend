const mongoose = require("mongoose");

const customerBookingSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
    },
    qrLink: {
      type: String,
    },
    deskNo: {
      type: String,
    },
    countPerson: {
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
