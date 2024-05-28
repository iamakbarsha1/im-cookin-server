const Streak = require("../model/streaks.model");

exports.getStreaks = async (req, res) => {
  const { page, limit, startIndex, endIndex } = req.pagination;

  try {
    const totalDocuments = await Streak.countDocuments(); // Retrieve the total count of documents
    const totalPages = Math.ceil(totalDocuments / limit); // Calculate the total number of pages

    // Ensure the page number is within the valid range
    if (page > totalPages) {
      return res.status(400).send({ error: "Page number exceeds total pages" });
    }

    // Fetch paginated results from the database
    const paginatedArr = await Streak.find().skip(startIndex).limit(limit);

    return res.status(200).json({
      code: 200,
      status: "Good!",
      description: "All Streaks",
      data: paginatedArr,
      currentPage: page,
      totalPages: totalPages,
      totalRecords: totalDocuments,
    });
  } catch (err) {
    console.error("Error fetching streaks: ->" + err);
    return res.status(500).json({
      code: 500,
      key: "Error",
      error: err.toString(),
      description: "Failed to retrieve streaks!",
    });
  }
};

exports.addStreak = (req, res) => {
  const data = req.body;
  // const email = req.body.payload.email; // req.body.payload._id

  const streakName = data.streakName;

  Streak.findOne({ streakName: streakName }).then((dbRes) => {
    if (dbRes !== null) {
      return res.status(200).json({
        code: 200,
        status: "Streak already existing!",
      });
    } else {
      Streak(data)
        .save()
        .then((dbRes) => {
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
    }
  });
};
