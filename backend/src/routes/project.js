const express = require('express');
const { body } = require('express-validator');
const { projectServices } = require('../services');
const { projectValidations } = require('../validations');

const projectRoutes = express.Router();

projectRoutes.get('/', projectServices.getProjects);
projectRoutes.get('/seed-projects', projectServices.getSeedProjects);
projectRoutes.get('/:project_uuid', projectServices.getProjectByUUID);
projectRoutes.delete('/:project_uuid', projectServices.deleteProjectByUUID);
projectRoutes.post(
  '/',
  projectValidations(body, ['title']),
  projectServices.postProject,
);

module.exports = projectRoutes;
