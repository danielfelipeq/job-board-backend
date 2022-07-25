const User = require("../model/user.model");
const Postulant = require("../model/postulant.model");
const { getUserId } = require("../middlewares/validateJwt");

module.exports = {
  // create a new postulant
  async create(req, res) {
    try {
      const userId = getUserId(req);
      const user = await User.findById(userId);
      const { name, linkedin, github, cv, photo } = req.body;
      const postulant = await Postulant.create({
        name,
        linkedin,
        github,
        cv,
        photo,
        user: userId,
      });
      // add the postulant to the user
      user.postulant.push(postulant._id);
      await user.save();
      return res.status(201).json({
        message: "Postulant created",
        postulant,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // get all postulants
  async getAll(req, res) {
    try {
      const postulants = await Postulant.find();
      return res.status(200).json({
        message: "Postulants retrieved",
        postulants,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // get a postulant by id
  async getById(req, res) {
    try {
      const postulant = await Postulant.findById(req.params.id);
      return res.status(200).json({
        message: "Postulant retrieved",
        postulant,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // update a postulant by id
  async update(req, res) {
    try {
      const userId = getUserId(req);
      const { name, linkedin, github, cv, photo } = req.body;
      const postulant = await Postulant.findByIdAndUpdate(
        req.params.id,
        {
          name,
          linkedin,
          github,
          cv,
          photo,
          user: userId,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Postulant updated",
        postulant,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // delete a postulant by id and remove it from the user
  async delete(req, res) {
    try {
      const userId = getUserId(req);
      const user = await User.findById(userId);
      const postulant = await Postulant.findByIdAndDelete(req.params.id);
      // remove the postulant from the user
      user.postulant.pull(postulant._id);
      await user.save();
      return res.status(200).json({
        message: "Postulant deleted",
        postulant,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // get all postulants by user id
  /* async getAllByUserId(req, res) {
    try {
      const userId = getUserId(req);
      const postulants = await Postulant.find({ user: userId });
      return res.status(200).json({
        message: "Postulants retrieved",
        postulants,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }, */
};
