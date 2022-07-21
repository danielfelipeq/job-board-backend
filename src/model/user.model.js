const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    postulant: {
      type: Schema.Types.ObjectId,
      ref: "Postulant",
      required: false,
    },
    recruiter: {
      type: Schema.Types.ObjectId,
      ref: "Recruiter",
      required: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
