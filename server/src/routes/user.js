const express = require("express");

const userRoutes = express.Router();

userRoutes.get("/", async(req, res, next) => {
  res.send("Users")
});

module.exports = userRoutes;