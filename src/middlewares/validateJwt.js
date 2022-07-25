const jwt = require("jsonwebtoken");

// get the user id from the token
const getUserId = (req) => {
  const header = req.headers.authorization || "";
  const token = header.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

// validate the token
const validateJwt = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      req.userId = decoded.id;
      next();
    });
  } else {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};

module.exports = { getUserId, validateJwt };
