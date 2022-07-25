const { Schema, model } = require("mongoose");
const offerSchema = new Schema(
  {
    offer: {
      type: String,
      required: false,
    },
    postulant: {
      type: Schema.Types.ObjectId,
      ref: "Postulant",
      required: true,
    },
    recruiter: {
      type: Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },
  },
  { timestamps: true }
);

const Offer = model("Offer", offerSchema);
module.exports = Offer;
