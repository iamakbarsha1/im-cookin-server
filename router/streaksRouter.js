const express = require("express");
const StreaksRouter = express.Router();
const streaksController = require("../controller/streaksController");
const { paginationMiddleware } = require("../middleware/pagination.middleware");

/** GET Methods */
/**
 * @openapi
 * '/streak/streaks':
 *  get:
 *     tags:
 *     - Streak Controller
 *     summary: Get all streaks
 *     parameters:
 *      - name: page
 *        in: query
 *        description: The page number to retrieve.
 *        required: false
 *        schema:
 *          type: integer
 *          default: 1
 *      - name: pageSize
 *        in: query
 *        required: false
 *        schema:
 *           type: integer
 *           default: 10
 *           description: The number of items per page.
 *     responses:
 *      '200':
 *          description: A paginated list of streaks
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                    example: 200
 *                  status:
 *                    type: string
 *                    example: Good!
 *                  description:
 *                    type: string
 *                    example: All Streaks
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        firstName:
 *                          type: string
 *                          example: John
 *                        lastName:
 *                          type: string
 *                          example: Doe
 *                        username:
 *                          type: string
 *                          example: johndoe
 *                        email:
 *                          type: string
 *                          example: johndoe@example.com
 *                        dob:
 *                          type: string
 *                          example: 2000-01-01
 *                  totalPages:
 *                    type: integer
 *                    example: 5
 *                  currentPage:
 *                    type: integer
 *                    example: 2
 *                  totalRecords:
 *                    type: integer
 *                    example: 50
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
StreaksRouter.get(
  "/streaks",
  paginationMiddleware(10),
  streaksController.getStreaks
);
StreaksRouter.post("/addStreak", streaksController.addStreak);

module.exports = StreaksRouter;
