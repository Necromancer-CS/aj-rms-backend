const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
  {
    menuName: {
      type: String,
    },
    menuPrice: {
      type: Number,
      default: 0,
    },
    menuStatus: {
      type: String,
      default: "ready",
    },
    menuType: {
      type: String,
    },
    file: {
      type: String,
      default: "noimage.jpg",
    },
    packageBufferId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("menus", menuSchema);
