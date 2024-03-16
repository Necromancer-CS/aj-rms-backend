const mongoose = require("mongoose");

const channelPayment = mongoose.Schema(
  {
    paymentName: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("channelPayment", channelPayment);
