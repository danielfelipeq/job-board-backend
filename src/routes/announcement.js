const router = require("express").Router();
const announcementController = require("../controllers/announcement.controller");

// create a new announcement
router.post("/", announcementController.create);
// get all announcements
router.get("/", announcementController.getAll);
// get an announcement by id
router.get("/:id", announcementController.getById);
// update an announcement
router.put("/:id", announcementController.update);
// delete an announcement
router.delete("/:id", announcementController.delete);
// get all announcements by recruiter
router.get("/recruiter", announcementController.getAllByRecruiter);

module.exports = router;
