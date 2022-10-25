const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in connecting database"));
db.once("open", () => console.log("Connected to database"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", require("./routes/user"));
app.use("/api/products", require("./routes/products"));
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
