const Announcement = require("../model/announcement.model");
const Recruiter = require("../model/recruiter.model");
const Postulant = require("../model/postulant.model");
const { getUserId } = require("../middlewares/validateJwt");

module.exports = {
  // create an announcement
  async create(req, res) {
    try {
      const userId = getUserId(req);
      // get the recruiter
      const recruiter = await Recruiter.findById(userId);
      // create the announcement
      const announcement = await Announcement.create({
        ...req.body,
        recruiter: recruiter._id,
      });
      // add the announcement to the recruiter
      recruiter.announcement.push(announcement._id);
      await recruiter.save();
      return res.status(201).json({
        message: "Announcement created",
        announcement,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // get all announcements
  async getAll(req, res) {
    try {
      const announcements = await Announcement.find();
      return res.status(200).json({
        message: "Announcements retrieved",
        announcements,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // get an announcement by id
  async getById(req, res) {
    try {
      const announcement = await Announcement.findById(req.params.id);
      return res.status(200).json({
        message: "Announcement retrieved",
        announcement,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // get all announcements by recruiter
  async getAllByRecruiter(req, res) {
    try {
      const userId = getUserId(req);
      const recruiter = await Recruiter.findById(userId);
      const announcements = await Announcement.find({
        recruiter: recruiter._id,
      });
      return res.status(200).json({
        message: "Announcements retrieved",
        announcements,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // update an announcement by id
  async update(req, res) {
    try {
      const userId = getUserId(req);
      // get the recruiter
      const recruiter = await Recruiter.findById(userId);
      // only the recruiter can update the announcement
      if (recruiter._id.toString() !== req.body.recruiter.toString()) {
        return res.status(401).json({
          message: "You are not authorized to update this announcement",
        });
      }
      // update the announcement
      const announcement = await Announcement.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          recruiter: recruiter._id,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Announcement updated",
        announcement,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // delete an announcement by id and remove it from the recruiter
  async delete(req, res) {
    try {
      const userId = getUserId(req);
      const recruiter = await Recruiter.findById(userId);
      const announcement = await Announcement.findByIdAndDelete(req.params.id);
      // only the recruiter can delete the announcement
      if (recruiter._id.toString() !== announcement.recruiter.toString()) {
        return res.status(401).json({
          message: "You are not authorized to delete this announcement",
        });
      }
      // remove the announcement from the recruiter
      recruiter.announcement.pull(announcement._id);
      await recruiter.save();
      return res.status(200).json({
        message: "Announcement deleted",
        announcement,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};
