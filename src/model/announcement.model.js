const { Schema, model } = require("mongoose");
const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: [50, "Title must be less than 50 characters"],
      minlength: [5, "Title must be more than 5 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [500, "Description must be less than 500 characters"],
      minlength: [10, "Description must be more than 10 characters"],
    },
    recruiter: {
      type: Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },
  },
  { timestamps: true }
);

const Announcement = model("Announcement", announcementSchema);
module.exports = Announcement;
