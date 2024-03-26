const Menu = require("../Models/Menu");
const CustomerBooking = require("../Models/CustomerBooking");
const Buffet = require("../Models/Buffet");
const fs = require("fs");
const { text } = require("body-parser");

//API สำหรับ UI ในส่วน Flow การทำงาน
exports.listPackageIdMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const customerBooking = await CustomerBooking.findById(id).exec();
    const packageBufferId = customerBooking.packageId;

    const checkPackage = await Menu.find({
      packageBufferId: packageBufferId,
    });
    res.send(checkPackage);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

//API สำหรับ UI ในส่วน จัดการข้อมูล billing
exports.list = async (req, res) => {
  try {
    // ค้นหาข้อมูล Menu ทั้งหมด
    const menus = await Menu.find({}).exec();

    // สร้าง array เพื่อเก็บข้อมูลที่จะส่งกลับ
    let responseData = [];

    // วนลูปผ่านข้อมูลของแต่ละเมนู
    for (const menu of menus) {
      // ค้นหาข้อมูล Buffet โดยใช้ packageBufferId จากเมนูปัจจุบัน
      const buffet = await Buffet.findOne({ _id: menu.packageBufferId }).exec();

      // สร้างข้อมูลใหม่ที่รวมข้อมูลจากทั้งสองตาราง
      const responseDataItem = {
        _id: menu._id,
        menuName: menu.menuName,
        menuPrice: menu.menuPrice,
        menuStatus: menu.menuStatus,
        menuType: menu.menuType,
        packageName: buffet.packageName,
      };
      responseData.push(responseDataItem);
    }
    res.send(responseData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//  ค้นหาข้อมูลเฉพาะที่ส่ง ID ไป
exports.read = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    const menu = await Menu.findOne({ _id: id }).exec();
    res.send(menu);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//  บันทึกข้อมูล
exports.create = async (req, res) => {
  try {
    // code
    var dataMenu = req.body;
    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");
      dataMenu.file = `data:${req.file.mimetype};base64,${base64Image}`;
    }
    const menu = await Menu(dataMenu).save();
    res.send(menu);
  } catch (error) {
    // error
    console.log(error);
  }
};

// แก้ไขข้อมูลโดยส่ง ID ไปหาและข้อมูลชุดใหม่ที่จะนำไปแก้ไข
exports.update = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    var newDataMenu = req.body;

    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");
      newDataMenu.file = `data:${req.file.mimetype};base64,${base64Image}`;
    }
    const menu = await Menu.findOneAndUpdate({ _id: id }, newDataMenu, {
      new: true,
    }).exec();
    res.send(menu);
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
    const menu = await Menu.findOneAndDelete({ _id: id }).exec();

    if (menu?.file) {
      await fs.unlink("./uploads/" + menu.file, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Remove success");
        }
      });
    }
    res.send(menu);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};
