const mongoose = require("mongoose");

const linkSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
    required: true,
  },
  image: String,
  source: String,
  description: String,
  logo: String,
  userId: String
});

module.exports = mongoose.model("Link", linkSchema);
