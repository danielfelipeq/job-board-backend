const router = require("express").Router();
const {
  create,
  getAll,
  getById,
  update,
} = require("../controllers/recruiter.controller");
const { validateJwt } = require("../middlewares/validateJwt");
// router with validation
router.post("/recruiter", validateJwt, create);
router.get("/recruiter", getAll);
router.get("/recruiter/:id", getById);
router.put("/recruiter/:id", update);

module.exports = router;
