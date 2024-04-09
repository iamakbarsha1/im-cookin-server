const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../model/user.model");

// const User = require("../models/User");

// Configure the Google strategy for Passport authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile"],
      state: true,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ "google.id": profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          const newUser = new User({
            google: {
              id: profile.id,
              displayName: profile.displayName,
            },
          });
          newUser.save(function (err) {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        } else {
          return done(null, user);
        }
      });
    }
  )
);

// Serialize and deserialize user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

const router = express.Router();

// Route to initiate Google authentication
router.get("/login/google", passport.authenticate("google"));

// Route to handle Google callback
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// Route to log out user
router.post("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
