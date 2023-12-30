const express = require("express");
const globalHandleError = require("./utils/globalHandleError");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const { userRoutes } = require("./routes");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use(globalHandleError);

module.exports = app;