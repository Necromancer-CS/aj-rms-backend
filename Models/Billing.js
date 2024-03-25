const mongoose = require("mongoose");

const billingSchema = mongoose.Schema(
  {
    customerBookingId: {
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
    packagePrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    chanelPayment: {
      type: String,
      default: "N",
    },
    payment: {
      type: Number,
      default: 0,
    },
    change: {
      type: Number,
      default: 0,
    },
    paidAt: {
      type: Date,
      default: null,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("billing", billingSchema);
