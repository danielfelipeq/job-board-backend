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
});

const Recruiter = model("Recruiter", recruiterSchema);
module.exports = Recruiter;
