const jwt = require("jsonwebtoken");

const keys = require("../config/keys");

module.exports = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    const error = new Error("Not authenticated.");
    error.status = 401;
    next(error);
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, keys.jwtSecretKey);
  } catch (err) {
    const error = new Error("Not authorized");
    error.status = 403;
    next(error);
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.status = 401;
    next(error);
  }
  req.user = decodedToken;
  next();
};
