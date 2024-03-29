const User = require("../Models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

exports.login = async (req, res) => {
  try {
    //code
    // 1. Check User
    const { email, password } = req.body;
    var dataUser = await User.findOneAndUpdate({ email }, { new: true });
    console.log(dataUser);
    if (dataUser) {
      const isMatch = await bcrypt.compare(password, dataUser.password);

      if (!isMatch) {
        return res.status(400).send("Password Invalid!!!");
      }
      // 2. Payload
      const user = {
        _id: dataUser._id,
        name: dataUser.name,
        email: dataUser.email,
        firstname: dataUser.firstname,
        lastname: dataUser.lastname,
        role: dataUser.role,
      };

      var payload = {
        user,
      };

      // 3. Generate
      jwt.sign(payload, "jwtsecret", { expiresIn: "1d" }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload, user });
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
