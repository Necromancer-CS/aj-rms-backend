const Buffet = require("../Models/Buffet");
const fs = require("fs");

//  ค้นหาข้อมูลทั้งหมด
exports.list = async (req, res) => {
  try {
    //  code
    const buffet = await Buffet.find({}).exec();
    res.send(buffet);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//  ค้นหาข้อมูลเฉพาะที่ส่ง ID ไป
exports.read = async (req, res) => {
  try {
    //  code
    const id = req.params.id;
    const buffet = await Buffet.findOne({ _id: id }).exec();
    res.send(buffet);
  } catch (error) {
    //  error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//  บันทึกข้อมูล
exports.create = async (req, res) => {
  try {
    //  code
    var dataBuffet = req.body;
    const buffet = await Buffet(dataBuffet).save();
    res.send(buffet);
  } catch (error) {
    //  error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// แก้ไขข้อมูลโดยส่ง ID ไปหาและข้อมูลชุดใหม่ที่จะนำไปแก้ไข
exports.update = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    const newDataBuffet = req.body;
    const buffet = await Buffet.findOneAndUpdate({ _id: id }, newDataBuffet, {
      new: true,
    }).exec();
    res.send(buffet);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// ลบข้อมูลโดยส่ง ID ไป
exports.remove = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    const buffet = await Buffet.findOneAndDelete({ _id: id }).exec();
    res.send(buffet);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};
