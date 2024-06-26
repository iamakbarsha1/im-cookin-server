require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./db/db");
const AuthRouter = require("./router/authRouter");
const StreakRouter = require("./router/streaksRouter");
const logger = require("./middleware/logger.middleware");
const { swaggerDocs } = require("./swagger");
const { checkAuthCookie } = require("./middleware/auth.middleware");
const { validateToken } = require("./helpers/token");

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser()); // cookie parser for token
// app.use(logger);
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:7000"], // Client URL
    methods: "GET, POST, PUT, DELETE", // Allowed methods
    credentials: true,
  })
);
app.disable("x-powered-by"); // less hackers know about our stack
// app.use(checkAuthCookie("token"));

// Routes
app.use(`/auth`, AuthRouter);
app.use(`/streak`, StreakRouter);
// app.use(`/api/post`);

// Server initialization
const port = process.env.PORT;
app.listen(port, (res, err) => {
  if (err) return logger.error("Server down! " + err);
  else swaggerDocs(app, port);
  return logger.info(`Server running on http://localhost:${port}`);
});

dbConnection(); // Database connection
