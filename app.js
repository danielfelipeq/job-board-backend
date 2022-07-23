const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRoute = require("./src/routes/user.js");
const announcementRoute = require("./src/routes/announcement.js");
const offerRoute = require("./src/routes/offer.js");
const recruiterRoute = require("./src/routes/recruiter.js");
const postulantRoute = require("./src/routes/postulant.js");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// endpoints
app.use("/auth/local", userRoute);
app.use("/job", announcementRoute);
app.use("/job", offerRoute);
app.use("/job", recruiterRoute);
app.use("/job", postulantRoute);

module.exports = app;
