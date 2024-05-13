const arr = [
  {
    streakName: "Gym",
    startDate: Date("00-00-0000"),
    count: 700, // How shall we work on this caz we have tofind the exact count based on the start date
  },
  {
    streakName: "Jog",
    startDate: Date("11-11-1111"),
    count: 70, // How shall we work on this caz we have tofind the exact count based on the start date
  },
];

exports.getStreaks = (req, res) => {
  return res.status(200).json({
    code: 200,
    status: "Good!",
    reqDate: arr,
  });
};

exports.addStreak = (req, res) => {
  const data = req.body.payload;
  const email = req.body.payload.email; // req.body.payload._id

  return res.status(200).json({
    // code: 200,
    // status: "Good!",
    // reqDate: arr,
  });
};
