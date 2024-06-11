const JWT = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET;
const jwtTimeout = process.env.JWT_TIMEOUT;

var options = {};

exports.generateToken = (user) => {
  const payload = {
    time: Date(),
    _id: user._id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
  };

  if (jwtTimeout) {
    options = {
      expiresIn: jwtTimeout,
    };
  }

  // Generate jwt token
  const token = JWT.sign(payload, jwtSecretKey, options);
  return token;
};

exports.validateToken = (token) => {
  const payload = JWT.verify(token, jwtSecretKey);
  return payload;
};
