const ChannelPayment = require("../Models/ChannelPayment");

//  ค้นหาข้อมูลทั้งหมด
exports.list = async (req, res) => {
  try {
    //  code
    const channelPayment = await ChannelPayment.find({}).exec();
    res.send(channelPayment);
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
    const channelPayment = await ChannelPayment.findOne({ _id: id }).exec();
    res.send(channelPayment);
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
    var dataChannelPayment = req.body;
    const channelPayment = await ChannelPayment(dataChannelPayment).save();
    res.send(channelPayment);
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
    const newDataChannelPayment = req.body;
    const channelPayment = await ChannelPayment.findOneAndUpdate(
      { _id: id },
      newDataChannelPayment,
      {
        new: true,
      }
    ).exec();
    res.send(channelPayment);
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
    const channelPayment = await ChannelPayment.findOneAndDelete({
      _id: id,
    }).exec();
    res.send(channelPayment);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};
