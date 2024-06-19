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

// exports.validateToken = (token) => {
//   const payload = JWT.verify(token, jwtSecretKey);
//   return payload;
// };
exports.validateToken = (req, res, next) => {
  console.log("cookies ---> " + JSON.stringify(req));
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      code: 401,
      description: "No token is provided!",
    });
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({
      code: 401,
      description: "Invalid token",
    });
  }
};
