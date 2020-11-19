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
});

module.exports = mongoose.model('Link', linkSchema);
