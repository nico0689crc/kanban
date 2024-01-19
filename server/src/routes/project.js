const express = require("express");
const { projectServices } = require('../services');

const projectRoutes = express.Router();

projectRoutes.get("/", projectServices.getProjects);
projectRoutes.get("/:project_uuid", projectServices.getProjectByUUID);

module.exports = projectRoutes;