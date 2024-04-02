const CustomerBooking = require("../Models/CustomerBooking");
const Buffet = require("../Models/Buffet");
const Desk = require("../Models/Desk");
const Billing = require("../Models/Billing");
const ChannelPayment = require("../Models/ChannelPayment");

//API สำหรับ UI ในส่วน Flow การทำงาน
//  บันทึกข้อมูล
exports.createCustomerBooking = async (req, res) => {
  try {
    //  code Main
    var dataCustomerBooking = req.body;
    const customerBooking = await CustomerBooking(dataCustomerBooking).save();
    var _id = customerBooking._id;

    // ส่วนสร้าง Update Status Desk
    var dataDeskNo = req.body.deskNo;
    var updateStatus = {
      deskStatus: "notReady",
      customerBookingId: _id,
    };
    const desk = await Desk.findOneAndUpdate(
      { deskNo: dataDeskNo },
      updateStatus,
      {
        new: true,
      }
    ).exec();

    // ส่วนสร้าง Update qrLink
    var updateData = {
      qrLink: customerBooking._id,
    };
    const qrLinkCustomerBooking = await CustomerBooking.findOneAndUpdate(
      { _id: _id },
      updateData,
      {
        new: true,
      }
    ).exec();

    // ส่วนสร้าง Billing
    var dataBilling = req.body;
    var packageId = req.body.packageId;
    var countAdult = req.body.countAdult;
    var countChildreng = req.body.countChildreng;
    var countChild = req.body.countChild;
    const buffetItem = await Buffet.findOne({ _id: packageId }).exec();
    var packagePrice = buffetItem.packagePrice;

    const DataItem = {
      customerBookingId: _id,
      deskNo: dataBilling.deskNo,
      countAdult: countAdult,
      countChildreng: countChildreng,
      countChild: countChild,
      packagePrice: packagePrice,
    };
    await Billing(DataItem).save();

    res.send(customerBooking);
  } catch (error) {
    //  error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//  แสดงรายการข้อมูล CustomerBooking ตาม ID ที่ส่งมา
exports.readQrCode = async (req, res) => {
  try {
    //  code
    const id = req.params.id;
    var customerBooking = await CustomerBooking.findOne({
      _id: id,
    }).exec();

    var paymentItem = await ChannelPayment.findOne({
      paymentName: customerBooking.chanelPayment,
    }).exec();

    var packageItem = await Buffet.findOne({
      _id: customerBooking.packageId,
    }).exec();

    var appRowCustomerBooking = {
      _id: customerBooking._id,
      qrLink: customerBooking._id,
      deskNo: customerBooking.deskNo,
      countAdult: customerBooking.countAdult,
      countChildreng: customerBooking.countChildreng,
      countChild: customerBooking.countChild,
      packageId: customerBooking.packageId,
      packageName: packageItem.packageName,
      chanelPayment: paymentItem._id,
      file: customerBooking.file,
      status: customerBooking.status,
      createdAt: customerBooking.createdAt,
      updatedAt: customerBooking.updatedAt,
      __v: customerBooking.__v,
    };

    res.send(appRowCustomerBooking);
  } catch (error) {
    //  error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// แก้ไขข้อมูลสำหรับลูกค้า Update Status Desk กับ CustomerBooking
exports.updateStatus = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    var updateStatusCustomerBooking = {
      status: "processing",
    };
    const customerBooking = await CustomerBooking.findOneAndUpdate(
      { _id: id },
      updateStatusCustomerBooking,
      {
        new: true,
      }
    ).exec();

    var updateStatusDesk = {
      deskStatus: "processing",
    };

    const desk = await Desk.findOneAndUpdate(
      { customerBookingId: id },
      updateStatusDesk,
      {
        new: true,
      }
    ).exec();

    res.send(customerBooking);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//  แสดงรายการข้อมูล CustomerBooking ตาม ID ที่ส่งมา
exports.readCustomerBooking = async (req, res) => {
  try {
    //  code
    const id = req.params.id;
    var customerBooking = await CustomerBooking.findOne({
      _id: id,
    }).exec();

    var packageItem = await Buffet.findOne({
      _id: customerBooking.packageId,
    }).exec();

    var appRowCustomerBooking = {
      _id: customerBooking._id,
      qrLink: customerBooking._id,
      deskNo: customerBooking.deskNo,
      countAdult: customerBooking.countAdult,
      countChildreng: customerBooking.countChildreng,
      countChild: customerBooking.countChild,
      packageId: customerBooking.packageId,
      packageName: packageItem.packageName,
      chanelPayment: customerBooking.chanelPayment,
      status: customerBooking.status,
      createdAt: customerBooking.createdAt,
      updatedAt: customerBooking.updatedAt,
      __v: customerBooking.__v,
    };

    res.send(appRowCustomerBooking);
  } catch (error) {
    //  error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//API สำหรับ UI ในส่วน จัดการข้อมูล billing
//  ค้นหาข้อมูลทั้งหมด
exports.list = async (req, res, next) => {
  try {
    //  code
    const customerBooking = await CustomerBooking.find({}).exec();
    res.send(customerBooking);
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
    const newDataCustomerBooking = req.body;
    const customerBooking = await CustomerBooking.findOneAndUpdate(
      { _id: id },
      newDataCustomerBooking,
      {
        new: true,
      }
    ).exec();
    res.send(customerBooking);
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
    const customerBooking = await CustomerBooking.findOneAndDelete({
      _id: id,
    }).exec();
    res.send(customerBooking);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// แก้ไขข้อมูลโดยส่ง ID ไปหาและข้อมูลชุดใหม่ที่จะนำไปแก้ไข
exports.updateCheckPaymentCustomerBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const newDataCheckPayment = req.body;

    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");
      newDataCheckPayment.file = `data:${req.file.mimetype};base64,${base64Image}`;
    }

    const updatedCheckPayment = await CustomerBooking.findOneAndUpdate(
      { _id: id },
      {
        chanelPayment: newDataCheckPayment.chanelPayment,
        file: newDataCheckPayment.file,
      },
      {
        new: true,
      }
    ).exec();

    if (!updatedCheckPayment) {
      return res.status(404).send("Check payment not found");
    }

    res.send(updatedCheckPayment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
