const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { userRoutes, projectRoutes } = require("./routes");
const { authenticateUser } = require("./middleware");
const globalHandleError = require("./utils/globalHandleError");

app.use(cors());
app.use(bodyParser.json());

// Public Routes
app.use("/api/users", userRoutes);

// Protected Routes
app.use(authenticateUser);

app.use("/api/projects", projectRoutes);

// Global Error Handler
app.use(globalHandleError);

module.exports = app;