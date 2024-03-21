const MongoDB = require("mongoose");
const logger = require("../middleware/logger.middleware");

const dbConnection = () => {
  MongoDB.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //  useCreateIndex: true,
  })
    .then((res) => logger.info(`MongoDB Connected! ` + res))
    .catch((err) => logger.error(`MongoDB connection FAILED: ` + err));
};

module.exports = dbConnection;
