const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");
const authRoute = require("./routes/auth");
const app = express();
app.use(cors());

// user authentication route
app.use("/api/users", authRoute);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Conected to MongDB"))
  .on("error", (err) => console.log(`ERROR: ${err}`));

app.listen(5000, () => {
  console.log("connected!");
});
