const express = require("express");
const AuthRouter = express.Router();
const utilsController = require("../controller/utilsController");

// AuthRouter.post("/register", )
AuthRouter.get("/status", utilsController.status);

module.exports = AuthRouter;
