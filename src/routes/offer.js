const router = require("express").Router();
const offerController = require("../controllers/offer.controller");

// create a new offer
router.post("/", offerController.recruit);
// get all offers
router.get("/", offerController.getAll);
// get an offer by id
router.get("/:id", offerController.getById);
