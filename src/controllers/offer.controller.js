const Offer = require("../model/offer.model");
const Postulant = require("../model/postulant.model");
const Recruiter = require("../model/recruiter.model");

const { getUserId } = require("../middlewares/validateJwt");

module.exports = {
  // recruit a postulant
  async recruit(req, res) {
    try {
      const userId = getUserId(req);
      // get the postulant
      const postulant = await Postulant.findById(req.params.id);
      // get the recruiter
      const recruiter = await Recruiter.findById(userId);
      // create the offer
      const offer = await Offer.create({
        postulant,
        recruiter: recruiter._id,
        offer,
      });
      // add the offer to the postulant
      postulant.offer.push(offer._id);
      await postulant.save();
      // add the offer to the recruiter
      recruiter.offer.push(offer._id);
      await recruiter.save();
      return res.status(201).json({
        message: "Offer created",
        offer,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // get all offers
  async getAll(req, res) {
    try {
      const offers = await Offer.find();
      return res.status(200).json({
        message: "Offers retrieved",
        offers,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // get an offer by id
  async getById(req, res) {
    try {
      const offer = await Offer.findById(req.params.id);
      return res.status(200).json({
        message: "Offer retrieved",
        offer,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};
