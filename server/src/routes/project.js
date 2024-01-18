const express = require("express");
const { projectServices } = require('../services');

const projectRoutes = express.Router();

projectRoutes.get("/", projectServices.getProjects);

module.exports = projectRoutes;