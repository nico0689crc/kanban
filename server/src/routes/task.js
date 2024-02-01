const express = require("express");
const { body } = require("express-validator");
const { taskServices } = require('../services');
const { taskValidations } = require('../validations');

const taskRoutes = express.Router();

taskRoutes.patch(
  "/:task_uuid",
  taskValidations(body, ["title", "description", "priority"]), 
  taskServices.updateTaskByUUID
);

module.exports = taskRoutes;