const Billing = require("../Models/Billing");
const CustomerBooking = require("../Models/CustomerBooking");
const Buffet = require("../Models/Buffet");
const Menu = require("../Models/Menu");
const CustomerOrderMenu = require("../Models/CustomerOrderMenu");

exports.salesMonthly = async (req, res) => {
  try {
    const monthlyTotal = [];
    for (let month = 1; month <= 12; month++) {
      const billings = await Billing.find({
        isPaid: false,
        createdAt: {
          $gte: new Date(new Date().getFullYear(), month - 1, 1),
          $lt: new Date(new Date().getFullYear(), month, 1),
        },
      }).exec();
      let totalPrice = 0;
      for (const billing of billings) {
        totalPrice += billing.totalPrice;
      }
      monthlyTotal.push({ month, totalPrice });
    }
    res.send(monthlyTotal);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.totalOpenDesk = async (req, res) => {
  try {
    const customerBookings = await CustomerBooking.find({
      status: "completed",
    }).exec();
    const totalOpenDesk = customerBookings.length;
    res.send({ totalOpenDesk });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.totalPrice = async (req, res) => {
  try {
    const billings = await Billing.find({ isPaid: false }).exec();
    let total = 0;
    for (const billing of billings) {
      total += billing.totalPrice;
    }
    res.send({ total });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.topPackage = async (req, res) => {
  try {
    const topPackage = await CustomerBooking.aggregate([
      { $match: { status: "completed" } }, // กรองเฉพาะข้อมูลที่มี status เป็น "completed"
      { $group: { _id: "$packageId", count: { $sum: 1 } } }, // นับจำนวนการเลือกแต่ละแพ็คเกจ
      { $sort: { count: -1 } }, // เรียงลำดับจำนวนการเลือกจากมากไปน้อย
      { $limit: 1 }, // จำกัดให้เอกสารผลลัพธ์เป็นเพียงหนึ่งเอกสาร
    ]);
    let dataPackageId = null; // กำหนดค่าเริ่มต้นให้เป็น null

    if (topPackage.length > 0) {
      dataPackageId = topPackage[0]._id; // เก็บค่า packageId ของ topPackage ลงใน dataPackageId
    }

    const buffets = await Buffet.findOne({ _id: dataPackageId }).exec();

    if (topPackage.length > 0) {
      res.send({
        topPackage: buffets.packageName,
        count: topPackage[0].count,
      }); // ส่งชื่อแพ็คเกจที่มีการเลือกมากที่สุดกลับไป
    } else {
      res.send({ topPackage: null }); // ถ้าไม่มีข้อมูลให้ส่งค่า null กลับไป
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.topMenu = async (req, res) => {
  try {
    const topMenu = await CustomerOrderMenu.aggregate([
      { $match: { status: "served" } }, // กรองเฉพาะข้อมูลที่มี status เป็น "completed"
      { $group: { _id: "$menuId", count: { $sum: 1 } } }, // นับจำนวนการเลือกแต่ละแพ็คเกจ
      { $sort: { count: -1 } }, // เรียงลำดับจำนวนการเลือกจากมากไปน้อย
      { $limit: 1 }, // จำกัดให้เอกสารผลลัพธ์เป็นเพียงหนึ่งเอกสาร
    ]);

    let dataMenuId = null; // กำหนดค่าเริ่มต้นให้เป็น null

    if (topMenu.length > 0) {
      dataMenuId = topMenu[0]._id; // เก็บค่า packageId ของ topPackage ลงใน dataPackageId
    }

    const menus = await Menu.findOne({ _id: dataMenuId }).exec();

    if (topMenu.length > 0) {
      res.send({
        topMenu: menus.menuName,
        count: topMenu[0].count,
      }); // ส่งชื่อแพ็คเกจที่มีการเลือกมากที่สุดกลับไป
    } else {
      res.send({ topMenu: null }); // ถ้าไม่มีข้อมูลให้ส่งค่า null กลับไป
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
