const mongoose = require("mongoose");

const streaksSchema = new mongoose.Schema({
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
    required: true,
  },
  owner: {
    // type: ObjectID
    // ref:
  },
});
