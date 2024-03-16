const mongoose = require("mongoose");

const buffetSchema = mongoose.Schema(
  {
    packageName: {
      type: String,
    },
    packagePrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("buffet", buffetSchema);
