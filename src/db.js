const mongooose = require("mongoose");

function connect() {
  mongooose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongooose.connection.once("open", () => {
    console.log("connected to MongoDB");
  });
  mongooose.connection.on("error", (err) => {
    console.log("error connecting to MongoDB", err);
  });
  return mongooose.connection;
}

module.exports = { connect };
