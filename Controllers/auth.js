const Admin = require("../Models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

exports.login = async (req, res) => {
  try {
    //code
    // 1. Check User
    const { username, password } = req.body;
    var dataUser = await Admin.findOneAndUpdate(
      { username: username },
      { new: true }
    );
    if (dataUser) {
      const isMatch = await bcrypt.compare(password, dataUser.password);

      if (!isMatch) {
        return res.status(400).send("Password Invalid!!!");
      }
      // 2. Payload
      const setData = {
        _id: dataUser._id,
        fullName: dataUser.fullName,
        role: dataUser.role,
        username: dataUser.username,
      };

      var payload = {
        setData,
      };

      // 3. Generate
      jwt.sign(payload, "jwtsecret", { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload, setData });
      });
    } else {
      return res.status(400).send("User not found!!!");
    }
  } catch (err) {
    //code
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.currentUser = async (req, res) => {
  try {
    // code
    console.log("currentUser", req.user);
    const currentUser = await User.findOne({ email: req.user.email })
      .select("-password")
      .exec();
    res.send(currentUser);
  } catch (error) {
    // error
    console.log(error);
    res.status(500).send("Server Error");
  }
};
