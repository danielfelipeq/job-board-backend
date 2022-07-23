const jwt = require("jsonwebtoken");

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

module.exports = { generateJWT };
