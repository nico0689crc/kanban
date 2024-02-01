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

taskRoutes.delete("/:task_uuid", taskServices.deleteTaskByUUID);
taskRoutes.post(
  "/",
  taskValidations(body, ["title", "section_uuid"]),  
  taskServices.postTask
);

module.exports = taskRoutes;