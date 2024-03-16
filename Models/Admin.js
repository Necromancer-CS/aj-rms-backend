const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    role: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("admin", adminSchema);
