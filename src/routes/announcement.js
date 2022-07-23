const router = require("express").Router();
const {
  create,
  getAll,
  getById,
  update,
} = require("../controllers/announcement.controller");
const { validateJwt } = require("../middlewares/validateJwt");
// router with validation
router.post("/announcement", validateJwt, create);
router.get("/announcement", getAll);
router.get("/announcement/:id", getById);
router.put("/announcement/:id", update);

module.exports = router;
