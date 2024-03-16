const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/RSDB");
    // await mongoose.connect(
    //   "mongodb+srv://dbUser:Oo9aUpt6yIBTjMuZ@cluster0.tuwms2h.mongodb.net/?retryWrites=true&w=majority"
    // );
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
