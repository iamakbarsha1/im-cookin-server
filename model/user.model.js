const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    password: {
      type: String,
    },
    OAuthProfiles: [],
    OAuthTypes: [],
    loginCount: {
      type: Number,
    },
    token: {
      type: String,
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

// Pre-save hook to hash the password
userSchema.pre("save", function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // Generate a salt and hash the password
  bcrypt.hash(user.password, 8, (err, hash) => {
    if (err) return next(err);

    // Replace the plain text with the hash
    // node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
