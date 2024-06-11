const { validateToken } = require("../helpers/token");

exports.checkAuthCookie = (cookieName) => {
  return (req, res, next) => {
    const currentPath = req.path;

    if (currentPath.includes(["/status", "/auth/register"])) {
      return next();
    } else {
      const tokenFromCookie = req.cookies[cookieName];
      console.log("req.cookies => " + req.cookies);
      console.log("tokenFromCookie => " + tokenFromCookie);
      if (!tokenFromCookie) {
        return next("token cannot be empty " + currentPath);
      }

      try {
        const userPaylaod = validateToken(tokenFromCookie);
        if (userPaylaod) {
          req.user = userPaylaod;
          return next();
        }
      } catch (e) {
        return next(e);
      }
    }
  };
};
