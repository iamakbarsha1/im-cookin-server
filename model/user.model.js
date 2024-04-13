const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    OAuthProfiles: [],
    OAuthTypes: [],
    loginCount: {
      type: Number,
    },
  },
  { timestamps: true },
  { collection: "user" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
