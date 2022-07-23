const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helper/generateJWT");

module.exports = {
  // register a new user
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        email,
        password: hashPassword,
      });
      await newUser.save();
      return res.status(201).json({
        message: "User created",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // login a user
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Password is incorrect",
        });
      }
      const token = generateJWT(user._id);
      return res.status(200).json({
        message: "User logged in",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};
