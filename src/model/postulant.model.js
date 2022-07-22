const { Schema, model } = require("mongoose");

const postulantSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  linkedin: {
    type: String,
    required: false,
  },
  github: {
    type: String,
    required: false,
  },
  cv: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  offer: [
    {
      type: Schema.Types.ObjectId,
      ref: "Offer",
      required: false,
    },
  ],
});

const Postulant = model("Postulant", postulantSchema);
module.exports = Postulant;
