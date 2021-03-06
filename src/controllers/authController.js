const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");

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

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({
        message: "user doesn't exist.",
      });
    }
    const isPwdCorrect = await bcrypt.compare(req.body.password, user.password);
    console.log(req.body.password, user.password);
    if (!isPwdCorrect) {
      return res.status(401).json({
        message: "password is not correct.",
      });
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1000h" }
    );

    res.status(200).json({
      token: token,
      expiresIn: 100000,
    });
  } catch (err) {
    throw new Error(err);
  }
};
