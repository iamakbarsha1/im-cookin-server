const express = require("express");
const AuthRouter = express.Router();
const utilsController = require("../controller/utilsController");

// AuthRouter.post("/register", )
AuthRouter.get("/status", utilsController.status);
AuthRouter.post("/oauth", utilsController.oauth);
AuthRouter.post("/register", utilsController.register);

module.exports = AuthRouter;
