const express = require("express");
const StreaksRouter = express.Router();
const streaksController = require("../controller/streaksController");
const { paginationMiddleware } = require("../middleware/pagination.middleware");

StreaksRouter.get(
  "/streaks",
  paginationMiddleware(10),
  streaksController.getStreaks
);
StreaksRouter.post("/addStreak", streaksController.addStreak);

module.exports = StreaksRouter;
