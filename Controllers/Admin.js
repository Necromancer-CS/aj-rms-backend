const Admin = require("../Models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

exports.create = async (req, res) => {
  try {
    //code
    const { fullName, role, username, password } = req.body;
    var dataUser = await Admin.findOne({ username });
    if (dataUser) {
      return res.send("User Already Exists!!!").status(400);
    }
    const salt = await bcrypt.genSalt(10);
    dataRegister = new Admin({
      fullName,
      role,
      username,
      password,
    });
    dataRegister.password = await bcrypt.hash(password, salt);
    console.log(dataRegister.password);
    // 3.Save
    await dataRegister.save();
    res.send("Register Success!!");
  } catch (err) {
    //code
    console.log(err);
    res.status(500).send("Server Error");
  }
};

//  ค้นหาข้อมูลทั้งหมด
exports.list = async (req, res) => {
  try {
    //  code
    const admin = await Admin.find({}).exec();
    res.send(admin);
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
    const admin = await Admin.findOne({ _id: id }).exec();
    // const hashedPassword = admin.password;
    // const enteredPassword = req.body.password;
    // console.log("asdasd");
    // const isPasswordValid = await bcrypt.compareSync(
    //   enteredPassword,
    //   hashedPassword
    // );
    res.send(admin);
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
    const newDataAdmin = req.body;
    const admin = await Admin.findOneAndUpdate({ _id: id }, newDataAdmin, {
      new: true,
    }).exec();
    res.send(admin);
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
    const admin = await Admin.findOneAndDelete({ _id: id }).exec();
    res.send(admin);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};
