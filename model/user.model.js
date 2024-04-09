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
    google: {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      displayName: {
        type: String,
      },
      photoUrl: {
        type: String,
      },
    },
  },
  { timestamps: true },
  { collection: "user" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
