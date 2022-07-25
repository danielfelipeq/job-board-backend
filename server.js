const app = require("./app");
const { connect } = require("./src/db");

const port = process.env.PORT || 8000;
connect();

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
