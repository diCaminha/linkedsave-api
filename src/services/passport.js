const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
require("dotenv/config");

const User = require("../models/user");
console.log(process.env.GOOGLE_CLIENT_ID);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
     //montar usuario com id do google e dados do profile
      
    }
  )
);

module.exports = passport;