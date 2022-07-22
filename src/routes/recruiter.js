const router = require("express").Router();
const recruiterController = require("../controllers/recruiter.controller");

// create a new recruiter
router.post("/", recruiterController.create);
// get all recruiters
router.get("/", recruiterController.getAll);
// get a recruiter by id
router.get("/:id", recruiterController.getById);
// update a recruiter
router.put("/:id", recruiterController.update);
// delete a recruiter
router.delete("/:id", recruiterController.delete);
