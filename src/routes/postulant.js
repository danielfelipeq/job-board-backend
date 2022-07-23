const router = require("express").Router();
const {
  create,
  getAll,
  getById,
  update,
} = require("../controllers/postulant.controller");
const { validateJwt } = require("../middlewares/validateJwt");
// router with validation
router.post("/postulant", validateJwt, create);
router.get("/postulant", getAll);
router.get("/postulant/:id", getById);
router.put("/postulant/:id", update);

module.exports = router;
