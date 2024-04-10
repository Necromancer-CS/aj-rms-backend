const OrderMenu = require("../Models/CustomerOrderMenu");
const Menu = require("../Models/Menu");
const fs = require("fs");

//API สำหรับ UI ในส่วน Flow การทำงาน

//  บันทึกข้อมูล
exports.createOrderMenu = async (req, res) => {
  try {
    //  code
    var dataOrderMenu = req.body;
    const options = { ordered: true };
    const orderMenu = await OrderMenu.insertMany(dataOrderMenu, options);
    res.send(orderMenu);
  } catch (error) {
    //  error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//  ค้นหาข้อมูลทั้งหมดโดย Where status
exports.listByStatusOrderMenu = async (req, res, next) => {
  try {
    const orderMenus = await OrderMenu.find({ status: "notServed" }).exec();

    // เก็บรายการของข้อมูลที่จะส่งกลับ
    let responseData = [];

    // วนลูปผ่าน OrderMenu ทั้งหมด
    for (const orderMenu of orderMenus) {
      // หาข้อมูลของ Menu ที่เกี่ยวข้องกับ OrderMenu นี้
      const menu = await Menu.findOne({ _id: orderMenu.menuId }).exec();

      // สร้างข้อมูลที่จะส่งกลับด้วยข้อมูลจากทั้งสองตาราง
      const responseDataItem = {
        _id: orderMenu._id,
        menuId: orderMenu.menuId,
        deskNo: orderMenu.deskNo,
        menuName: menu.menuName,
        customerBookingId: orderMenu.customerBookingId,
        // เพิ่มข้อมูลอื่นๆ จาก OrderMenu ตามที่ต้องการ
        // ตัวอย่างเช่น: status, quantity, price, เป็นต้น
        status: orderMenu.status,
        quantity: orderMenu.quantity,
        // เพิ่มข้อมูลอื่นๆ จาก Menu ตามที่ต้องการ
        // ตัวอย่างเช่น: price, description, เป็นต้น
        price: menu.price,
        description: menu.description,
      };

      // เพิ่มข้อมูลที่ได้ลงใน array responseData
      responseData.push(responseDataItem);
    }

    // ส่งข้อมูลทั้งหมดกลับไปยัง client
    res.send(responseData);
    //res.send(orderMenus);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//  ค้นหาข้อมูลทั้งหมด Where Id
exports.listOrderMenu = async (req, res, next) => {
  try {
    //  code
    const customerBookingId = req.params.id;
    const orderMenus = await OrderMenu.find({
      customerBookingId: customerBookingId,
    }).exec();
    // เก็บรายการของข้อมูลที่จะส่งกลับ
    let responseData = [];

    // วนลูปผ่าน OrderMenu ทั้งหมด
    for (const orderMenu of orderMenus) {
      // หาข้อมูลของ Menu ที่เกี่ยวข้องกับ OrderMenu นี้
      const menu = await Menu.findOne({ _id: orderMenu.menuId }).exec();

      // สร้างข้อมูลที่จะส่งกลับด้วยข้อมูลจากทั้งสองตาราง
      const responseDataItem = {
        _id: orderMenu._id,
        menuId: orderMenu.menuId,
        deskNo: orderMenu.deskNo,
        menuName: menu.menuName,
        customerBookingId: orderMenu.customerBookingId,
        // เพิ่มข้อมูลอื่นๆ จาก OrderMenu ตามที่ต้องการ
        // ตัวอย่างเช่น: status, quantity, price, เป็นต้น
        status: orderMenu.status,
        quantity: orderMenu.quantity,
        // เพิ่มข้อมูลอื่นๆ จาก Menu ตามที่ต้องการ
        // ตัวอย่างเช่น: price, description, เป็นต้น
        price: menu.price,
        description: menu.description,
      };

      // เพิ่มข้อมูลที่ได้ลงใน array responseData
      responseData.push(responseDataItem);
    }

    // ส่งข้อมูลทั้งหมดกลับไปยัง client
    res.send(responseData);
    next();
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// แก้ไขข้อมูลโดยส่ง ID ไปหาและข้อมูล Status ใหม่
exports.updateStatusOrderMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const newStatusOrderMenu = req.body.status;

    // ค้นหา OrderMenu ที่ต้องการอัปเดต
    const orderMenu = await OrderMenu.findOneAndUpdate(
      { _id: id },
      { $set: { status: newStatusOrderMenu } },
      { new: true }
    ).exec();

    if (newStatusOrderMenu === "refuse") {
      const menu = await Menu.findOneAndUpdate(
        { _id: orderMenu.menuId },
        { $set: { menuStatus: "notReady" } },
        { new: true }
      ).exec();

      // สร้างข้อมูลที่จะส่งกลับไปยัง client พร้อมกับชื่อเมนู
      const responseData = {
        orderId: orderMenu._id,
        menuName: menu.menuName,
        status: orderMenu.status,
        // เพิ่มข้อมูลอื่นๆ จาก OrderMenu ตามที่ต้องการ
      };

      res.send(responseData); // ส่งข้อมูลทั้งหมดกลับไปยัง client
    } else {
      const menu = await Menu.findOne({ _id: orderMenu.menuId }).exec();

      // สร้างข้อมูลที่จะส่งกลับไปยัง client พร้อมกับชื่อเมนู
      const responseData = {
        orderId: orderMenu._id,
        menuName: menu.menuName,
        status: orderMenu.status,
        // เพิ่มข้อมูลอื่นๆ จาก OrderMenu ตามที่ต้องการ
      };

      res.send(responseData); // ส่งข้อมูลทั้งหมดกลับไปยัง client
    }

    // ค้นหาข้อมูลของเมนูที่เกี่ยวข้องด้วย menuId จาก OrderMenu
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//API สำหรับ UI ในส่วน จัดการข้อมูล billing
//  ค้นหาข้อมูลทั้งหมด
exports.list = async (req, res, next) => {
  try {
    //  code
    const orderMenu = await OrderMenu.find({}).exec();
    res.send(orderMenu);
    next();
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// แก้ไขข้อมูลโดยส่ง ID ไปหาและข้อมูลชุดใหม่ที่จะนำไปแก้ไข
exports.update = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    const newDataOrderMenu = req.body;
    const orderMenu = await OrderMenu.findOneAndUpdate(
      { _id: id },
      newDataOrderMenu,
      {
        new: true,
      }
    ).exec();
    res.send(orderMenu);
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
    const orderMenu = await OrderMenu.findOneAndDelete({
      _id: id,
    }).exec();
    res.send(orderMenu);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};
