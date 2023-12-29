const express = require("express");
const { User }  = require('../models');

const userRoutes = express.Router();

userRoutes.get("/", async(req, res, next) => {
  const users = await User.findAll();

  res.json(users)
});

module.exports = userRoutes;