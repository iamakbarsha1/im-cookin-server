const express = require("express");
const AuthRouter = express.Router();
const utilsController = require("../controller/utilsController");

/** Auth Methods */
AuthRouter.get("/status", utilsController.status);
AuthRouter.post("/oauth", utilsController.oauth);

/**
 * @openapi
 * '/auth/register':
 *  post:
 *     tags:
 *     - Auth Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *            properties:
 *              username:
 *                type: string
 *                default: iamakbarsha1
 *              email:
 *                type: string
 *                default: iamakbarsha1@mail.com
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
AuthRouter.post("/register", utilsController.register);

module.exports = AuthRouter;
