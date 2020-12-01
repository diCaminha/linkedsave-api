const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
  userId: String,
  read: Boolean,
});

const userSchema = mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  counterReads: {
    type: Number,
    set: (v) => Math.round(v),
    set: (v) => Math.round(v),
    default: 0,
  },
  links: [linkSchema],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
