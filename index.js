require("dotenv").config({});
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const indexRouter = require("./src/routes");
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false}))

app.use("/", indexRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
