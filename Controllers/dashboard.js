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
    const billings = await Billing.find({ isPaid: true }).exec();
    let total = 0;
    for (const billing of billings) {
      total += billing.totalPrice;
    }
    res.send({ total });
    // res.send(billings);
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
    const topMenus = await CustomerOrderMenu.aggregate([
      { $match: { status: "served" } }, // กรองเฉพาะข้อมูลที่มี status เป็น "completed"
      { $group: { _id: "$menuId", count: { $sum: 1 } } }, // นับจำนวนการเลือกแต่ละเมนู
      { $sort: { count: -1 } }, // เรียงลำดับจำนวนการเลือกจากมากไปน้อย
      { $limit: 5 }, // จำกัดให้เอกสารผลลัพธ์เป็น 5 เมนูเท่านั้น
    ]);

    const topMenusAll = await CustomerOrderMenu.aggregate([
      { $match: { status: "served" } }, // กรองเฉพาะข้อมูลที่มี status เป็น "completed"
      { $group: { _id: "$menuId", count: { $sum: 1 } } }, // นับจำนวนการเลือกแต่ละเมนู
    ]);

    const totalOrderedMenus = topMenusAll.reduce(
      (accumulator, menu) => accumulator + menu.count,
      0
    ); // คำนวณจำนวนเมนูที่ถูกสั่งทั้งหมด

    const topMenuIds = topMenus.map((menu) => menu._id); // ดึงเฉพาะ _id ของเมนูจากผลลัพธ์ที่ได้

    const menus = await Menu.find({ _id: { $in: topMenuIds } }).exec(); // ดึงข้อมูลเมนูที่มี _id ใน topMenuIds

    const topMenuDetails = topMenus.map((menu, index) => ({
      _id: menus[index]._id,
      name: menus[index].menuName,
      count: menu.count,
    }));

    res.send({ topMenuDetails, totalOrderedMenus }); // ส่งข้อมูล topMenuDetails และ totalOrderedMenus กลับไป
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
