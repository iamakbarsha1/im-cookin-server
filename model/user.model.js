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
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    dob: {
      type: Date,
    },
    OAuthProfiles: [],
    OAuthTypes: [],
    loginCount: {
      type: Number,
    },
  },
  {
    timestamps: true,
    virtuals: {
      fullName: {
        get() {
          return this.firstName + " " + this.lastName;
        },
      },
    },
  },
  { collection: "user" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
