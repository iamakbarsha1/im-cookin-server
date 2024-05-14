const express = require("express");
const StreaksRouter = express.Router();
const streaksController = require("../controller/streaksController");

StreaksRouter.get("/streaks", streaksController.getStreaks);
