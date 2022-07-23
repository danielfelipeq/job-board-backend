const router = require("express").Router();
const { recruit, getAll, getById } = require("../controllers/offer.controller");
const { validateJwt } = require("../middlewares/validateJwt");
// router with validation
router.post("/offer", validateJwt, recruit);
router.get("/offer", getAll);
router.get("/offer/:id", getById);
module.exports = router;
