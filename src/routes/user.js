const router = require("express").Router();
const userController = require("../controllers/user.controller");

// login a user
router.post("/login", userController.login);
// register a user
router.post("/register", userController.register);

module.exports = router;
