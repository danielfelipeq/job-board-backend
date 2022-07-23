const { Schema, model } = require("mongoose");
// data recruiter
const recruiterSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  company: {
    type: String,
    required: [true, "Company is required"],
  },
  photoLogo: {
    type: String,
    required: false,
  },
  offer: [
    {
      type: Schema.Types.ObjectId,
      ref: "Offer",
      required: false,
    },
  ],
  announcement: [
    {
      type: Schema.Types.ObjectId,
      ref: "Announcement",
      required: false,
    },
  ],
});

const Recruiter = model("Recruiter", recruiterSchema);
module.exports = Recruiter;
