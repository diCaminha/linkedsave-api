const Dayread = require("../models/dayread");
const jwt = require('jsonwebtoken');

exports.getDayreads = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const tokenDecoded = jwt.decode(token);
  const dayReads = await Dayread.find({ user: tokenDecoded.userId });
  res.status(200).json({
    data: dayReads,
  });
};
