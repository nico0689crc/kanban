const express = require("express");
const { body } = require("express-validator");
const { userServices } = require('../services');
const { userValidations } = require('../validations');

const userRoutes = express.Router();

userRoutes.get("/", userServices.getUsers);
userRoutes.get("/:user_uuid", userServices.getUserByUUID);
userRoutes.delete("/:user_uuid", userServices.deleteUserByUUID);
userRoutes.patch(
  "/:user_uuid", 
  userValidations(body, ["first_name", "last_name", "password"]),
  userServices.updateUserByUUID
);
userRoutes.post(
  "/register",
  userValidations(body, ["first_name", "last_name", "email_unique", "password"]),
  userServices.registerUser
);
userRoutes.post(
  "/login",
  userValidations(body, ["email", "password_not_empty"]), 
  userServices.registerUser
);

module.exports = userRoutes;