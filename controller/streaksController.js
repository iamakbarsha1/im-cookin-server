const Streak = require("../model/streaks.model");
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
  Streak.find()
    .then((dbRes) => {
      return res.status(200).json({
        code: 200,
        status: "Good!",
        description: "All Streaks",
        data: dbRes,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        code: 400,
        key: "Error",
        description: "Failed to retrive streaks!",
      });
    });

  // return res.status(200).json({
  //   code: 200,
  //   status: "Good!",
  //   reqDate: arr,
  // });
};

exports.addStreak = (req, res) => {
  const data = req.body;
  // const email = req.body.payload.email; // req.body.payload._id
  console.log("req.body" + JSON.stringify(req.body));

  Streak(data)
    .save()
    .then((dbRes) => {
      console.log("dbRes: " + dbRes);
      return res.status(200).json({
        code: 200,
        status: "Streak Added!",
        reqData: dbRes,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        code: 400,
        status: "Oops! Issue occurred while adding a streak.",
        reqData: err,
      });
    });
};
