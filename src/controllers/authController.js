const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  let pwdHashed = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: pwdHashed,
  });

  try {
    const userSaved = await user.save();
    res.status(201).json({
      message: "user created",
      data: userSaved,
    });
  } catch (err) {
    res.status(500).json({
      message: "error happens: " + err,
    });
  }
};
