const Desk = require("../Models/Desk");
const fs = require("fs");

//  ค้นหาข้อมูลทั้งหมด
exports.list = async (req, res) => {
  try {
    //  code
    const desk = await Desk.find({}).exec();
    res.send(desk);
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
    const desk = await Desk.findOne({ _id: id }).exec();
    res.send(desk);
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
    var dataDesk = req.body;
    const deskCheck = await Desk.findOne({ deskNo: dataDesk.deskNo }).exec();
    if (!deskCheck) {
      const desk = await Desk(dataDesk).save();
      res.send(desk);
    } else {
      res.status(400).send("DeskNo Already.");
    }
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
    const newDataDesk = req.body;
    const deskCheck = await Desk.findOne({
      deskNo: newDataDesk.deskNo,
    }).exec();
    if (!deskCheck || (deskCheck && deskCheck._id.toString() === id)) {
      const desk = await Desk.findOneAndUpdate({ _id: id }, newDataDesk, {
        new: true,
      }).exec();
      res.send(desk);
    } else {
      res.status(400).send("The table number already exists.");
    }
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
    const desk = await Desk.findOneAndDelete({ _id: id }).exec();
    res.send(desk);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};
