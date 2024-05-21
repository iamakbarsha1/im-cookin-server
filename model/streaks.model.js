const mongoose = require("mongoose");

const streaksSchema = new mongoose.Schema(
  {
    streakName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    streak: {
      type: Number,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
  { collection: "streak" }
);

const Streak = mongoose.model("Streak", streaksSchema);

module.exports = Streak;
