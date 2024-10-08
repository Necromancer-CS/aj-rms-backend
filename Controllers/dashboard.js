const Billing = require("../Models/Billing");
const CustomerBooking = require("../Models/CustomerBooking");
const Buffet = require("../Models/Buffet");
const Menu = require("../Models/Menu");
const CustomerOrderMenu = require("../Models/CustomerOrderMenu");

exports.totalPriceForDay = async (req, res) => {
  try {
    //วันนี้
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const billings = await Billing.find({
      isPaid: true,
      createdAt: {
        $gte: startOfToday,
        $lt: endOfToday,
      },
    }).exec();

    let totalPriceToday = 0;
    for (const billing of billings) {
      totalPriceToday += billing.totalPrice;
    }

    //เมื่อวาน
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const startOfYesterday = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate()
    );
    const endOfYesterday = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate() + 1
    );

    const billingsYesterday = await Billing.find({
      isPaid: true,
      createdAt: {
        $gte: startOfYesterday,
        $lt: endOfYesterday,
      },
    }).exec();

    let totalPriceYesterday = 0;
    for (const billing of billingsYesterday) {
      totalPriceYesterday += billing.totalPrice;
    }

    let percentageChange = 0;
    let textData = "";

    if (totalPriceYesterday != 0) {
      percentageChange =
        ((totalPriceToday - totalPriceYesterday) / totalPriceYesterday) * 100;
    }

    const todayTotal = {
      totalPriceForDay: parseFloat(totalPriceToday.toFixed(2)),
      totalPriceForYesterday: parseFloat(totalPriceYesterday.toFixed(2)),
      percentageChange: parseFloat(percentageChange.toFixed(2)),
    };

    res.send(todayTotal);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.totalPriceForWeek = async (req, res) => {
  try {
    // วันนี้
    const today = new Date();
    const startOfThisWeek = new Date(today);
    startOfThisWeek.setDate(startOfThisWeek.getDate() - today.getDay()); // หาวันแรกของสัปดาห์
    startOfThisWeek.setHours(0, 0, 0, 0); // กำหนดเวลาเป็นเที่ยงคืน

    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(endOfThisWeek.getDate() + 7); // หาวันสุดท้ายของสัปดาห์

    const billingsThisWeek = await Billing.find({
      isPaid: true,
      createdAt: {
        $gte: startOfThisWeek,
        $lt: endOfThisWeek,
      },
    }).exec();

    let totalPriceThisWeek = 0;
    for (const billing of billingsThisWeek) {
      totalPriceThisWeek += billing.totalPrice;
    }

    // สัปดาห์ก่อนหน้า
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7); // หาวันแรกของสัปดาห์ก่อนหน้า
    const endOfLastWeek = new Date(startOfLastWeek);
    endOfLastWeek.setDate(endOfLastWeek.getDate() + 7); // หาวันสุดท้ายของสัปดาห์ก่อนหน้า

    const billingsLastWeek = await Billing.find({
      isPaid: true,
      createdAt: {
        $gte: startOfLastWeek,
        $lt: endOfLastWeek,
      },
    }).exec();

    let totalPriceLastWeek = 0;
    for (const billing of billingsLastWeek) {
      totalPriceLastWeek += billing.totalPrice;
    }

    let percentageChange = 0;
    if (totalPriceLastWeek !== 0) {
      percentageChange =
        ((totalPriceThisWeek - totalPriceLastWeek) / totalPriceLastWeek) * 100;
    }

    const weeklyTotal = {
      totalPriceThisWeek: parseFloat(totalPriceThisWeek.toFixed(2)),
      totalPriceForWeek: parseFloat(totalPriceLastWeek.toFixed(2)),
      percentageChange: parseFloat(percentageChange.toFixed(2)),
    };

    res.send(weeklyTotal);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.totalPriceForMonth = async (req, res) => {
  try {
    // วันนี้
    const today = new Date();
    const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfThisMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    const billingsThisMonth = await Billing.find({
      isPaid: true,
      createdAt: {
        $gte: startOfThisMonth,
        $lt: endOfThisMonth,
      },
    }).exec();

    let totalPriceThisMonth = 0;
    for (const billing of billingsThisMonth) {
      totalPriceThisMonth += billing.totalPrice;
    }

    // เดือนที่แล้ว
    const startOfLastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    const billingsLastMonth = await Billing.find({
      isPaid: true,
      createdAt: {
        $gte: startOfLastMonth,
        $lt: endOfLastMonth,
      },
    }).exec();

    let totalPriceLastMonth = 0;
    for (const billing of billingsLastMonth) {
      totalPriceLastMonth += billing.totalPrice;
    }

    let percentageChangeMonth = 0;
    if (totalPriceLastMonth !== 0) {
      percentageChangeMonth =
        ((totalPriceThisMonth - totalPriceLastMonth) / totalPriceLastMonth) *
        100;
    }

    const monthlyTotal = {
      totalPriceThisMonth: parseFloat(totalPriceThisMonth.toFixed(2)),
      totalPriceLastMonth: parseFloat(totalPriceLastMonth.toFixed(2)),
      percentageChange: parseFloat(percentageChangeMonth.toFixed(2)),
    };

    res.send(monthlyTotal);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.totalPriceForYear = async (req, res) => {
  try {
    const today = new Date();
    const startOfThisYear = new Date(today.getFullYear(), 0, 1);
    const endOfThisYear = new Date(today.getFullYear() + 1, 0, 0);

    const billingsThisYear = await Billing.find({
      isPaid: true,
      createdAt: {
        $gte: startOfThisYear,
        $lt: endOfThisYear,
      },
    }).exec();

    const totalPriceThisYear = billingsThisYear.reduce(
      (total, billing) => total + billing.totalPrice,
      0
    );

    const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
    const endOfLastYear = new Date(today.getFullYear(), 0, 0);

    const billingsLastYear = await Billing.find({
      isPaid: true,
      createdAt: {
        $gte: startOfLastYear,
        $lt: endOfLastYear,
      },
    }).exec();

    const totalPriceLastYear = billingsLastYear.reduce(
      (total, billing) => total + billing.totalPrice,
      0
    );

    const percentageChangeYear =
      totalPriceLastYear !== 0
        ? ((totalPriceThisYear - totalPriceLastYear) / totalPriceLastYear) * 100
        : totalPriceThisYear !== 0
        ? 100
        : 0;

    console.log("Total Price This Year:", totalPriceThisYear);
    console.log("Total Price Last Year:", totalPriceLastYear);
    console.log("Percentage Change Year:", percentageChangeYear);

    const yearlyTotal = {
      totalPriceThisYear: parseFloat(totalPriceThisYear.toFixed(2)),
      totalPriceLastYear: parseFloat(totalPriceLastYear.toFixed(2)),
      percentageChange: parseFloat(percentageChangeYear.toFixed(2)),
    };

    res.send(yearlyTotal);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// exports.totalPriceForYear = async (req, res) => {
//   try {
//     // วันนี้
//     const today = new Date();
//     const startOfThisYear = new Date(today.getFullYear(), 0, 1);
//     const endOfThisYear = new Date(today.getFullYear() + 1, 0, 0);

//     const billingsThisYear = await Billing.find({
//       isPaid: true,
//       createdAt: {
//         $gte: startOfThisYear,
//         $lt: endOfThisYear,
//       },
//     }).exec();

//     let totalPriceThisYear = 0;
//     for (const billing of billingsThisYear) {
//       totalPriceThisYear += billing.totalPrice;
//     }

//     // ปีที่แล้ว
//     const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
//     const endOfLastYear = new Date(today.getFullYear(), 0, 0);

//     const billingsLastYear = await Billing.find({
//       isPaid: true,
//       createdAt: {
//         $gte: startOfLastYear,
//         $lt: endOfLastYear,
//       },
//     }).exec();

//     let totalPriceLastYear = 0;
//     for (const billing of billingsLastYear) {
//       totalPriceLastYear += billing.totalPrice;
//     }

//     let percentageChangeYear = 0;
//     if (totalPriceLastYear !== 0) {
//       percentageChangeYear =
//         ((totalPriceThisYear - totalPriceLastYear) / totalPriceLastYear) * 100;
//     }

//     const yearlyTotal = {
//       totalPriceThisYear: parseFloat(totalPriceThisYear.toFixed(2)),
//       totalPriceLastYear: parseFloat(totalPriceLastYear.toFixed(2)),
//       percentageChange: parseFloat(percentageChangeYear.toFixed(2)),
//     };

//     const yearlyTotalNot = {
//       totalPriceThisYear: 0,
//       totalPriceLastYear: 0,
//       percentageChange: 0,
//     };

//     if (yearlyTotal) {
//       res.send(yearlyTotalNot);
//     } else {
//       res.send(yearlyTotalNot);
//     }

//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server Error");
//   }
// };

function getWeeksInMonth(month, year) {
  const weeks = [];
  let startDate = new Date(year, month, 1);
  let endDate = new Date(year, month, 1 + (6 - startDate.getDay()));

  while (startDate.getMonth() === month) {
    weeks.push([new Date(startDate), new Date(endDate)]);
    startDate.setDate(startDate.getDate() + 7);
    endDate.setDate(endDate.getDate() + 7);
    if (endDate.getMonth() !== month) {
      endDate = new Date(year, month + 1, 0);
    }
  }

  return weeks;
}

exports.totalPriceForMonthSegments = async (req, res) => {
  try {
    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();
    const segments = [];
    const weeksInMonth = getWeeksInMonth(thisMonth, thisYear);

    for (const [weekStartDate, weekEndDate] of weeksInMonth) {
      const billingsInWeek = await Billing.find({
        isPaid: true,
        createdAt: {
          $gte: weekStartDate,
          $lte: weekEndDate,
        },
      }).exec();

      const totalPriceInWeek = billingsInWeek.reduce(
        (total, billing) => total + billing.totalPrice,
        0
      );

      segments.push({
        weekStartDate: weekStartDate.toISOString(),
        weekEndDate: weekEndDate.toISOString(),
        totalPriceInWeek: parseFloat(totalPriceInWeek.toFixed(2)),
      });
    }

    res.send(segments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.packageSelectionInMonth = async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setDate(1);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const completedBookings = await CustomerBooking.find({
      status: "completed",
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    const packageSelections = {};

    completedBookings.forEach((booking) => {
      const packageName = booking.packageId;
      if (packageSelections[packageName]) {
        packageSelections[packageName]++;
      } else {
        packageSelections[packageName] = 1;
      }
    });

    const allPackages = await Buffet.find({});
    const packagesData = allPackages.map((packageItem) => {
      const selectionCount = packageSelections[packageItem._id] || 0;
      return {
        packageName: packageItem.packageName,
        selectionCount: selectionCount,
      };
    });

    res.send(packagesData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
