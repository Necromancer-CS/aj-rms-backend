const Billing = require("../Models/Billing");
const CustomerBooking = require("../Models/CustomerBooking");
const Desk = require("../Models/Desk");

//  ค้นหาข้อมูล
exports.listBilling = async (req, res) => {
  try {
    //  code
    const billing = await Billing.find({ isPaid: false }).exec();
    res.send(billing);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//  ค้นหาข้อมูลเฉพาะที่ส่ง ID ไป
exports.readBilling = async (req, res) => {
  try {
    //  code
    const id = req.params.id;
    const billing = await Billing.find({ customerBookingId: id }).exec();
    res.send(billing);
  } catch (error) {
    //  error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//  บันทึกข้อมูล
exports.createBilling = async (req, res) => {
  try {
    //  code
    var dataBilling = req.body;
    const billing = await Billing(dataBilling).save();
    res.send(billing);
  } catch (error) {
    //  error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// แก้ไขข้อมูลโดยส่ง ID ไปหาและข้อมูลชุดใหม่ที่จะนำไปแก้ไข
exports.updateBilling = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    const newData = req.body;
    const billingUpdate = await Billing.findOneAndUpdate(
      { customerBookingId: id },
      newData,
      {
        new: true,
      }
    ).exec();

    const updateStatusCustomerBooking = "completed";
    await CustomerBooking.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          status: updateStatusCustomerBooking,
          userBilling: newData.userBilling,
        },
      },
      { new: true }
    );

    const dataCostomerDesk = await CustomerBooking.findOne({ _id: id }).exec();

    const updateStatusDesk = "ready";
    const updateCoustomerBookingIdDesk = "";
    const checkDeskNo = dataCostomerDesk.deskNo;

    await Desk.findOneAndUpdate(
      { deskNo: checkDeskNo },
      {
        $set: {
          deskStatus: updateStatusDesk,
          customerBookingId: updateCoustomerBookingIdDesk,
        },
      },
      { new: true }
    );
    res.send(billingUpdate);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};

//API สำหรับ UI ในส่วน จัดการข้อมูล billing
exports.list = async (req, res) => {
  try {
    //  code
    const billing = await Billing.find({}).exec();
    res.send(billing);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error ");
  }
};

// ลบข้อมูลโดยส่ง ID ไป
exports.remove = async (req, res) => {
  try {
    // code
    const id = req.params.id;
    const billing = await Billing.findOneAndDelete({ _id: id }).exec();
    res.send(billing);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};
