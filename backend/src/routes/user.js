const express = require('express');
const { body } = require('express-validator');
const { userServices } = require('../services');
const { userValidations } = require('../validations');

const userRoutes = express.Router();

userRoutes.get('/', userServices.getUsers);

userRoutes.get('/:user_uuid', userServices.getUserByUUID);

userRoutes.delete('/:user_uuid', userServices.deleteUserByUUID);

userRoutes.patch(
  '/:user_uuid',
  userValidations(body, ['first_name', 'last_name', 'password']),
  userServices.updateUserByUUID,
);

userRoutes.post(
  '/register',
  userValidations(body, ['first_name', 'last_name', 'email_unique', 'password', 'confirm_password']),
  userServices.registerUser,
);

userRoutes.post(
  '/verify-email',
  userValidations(body, ['email']),
  userServices.verifyUserEmail,
);

userRoutes.post(
  '/request-reset-password',
  userValidations(body, ['email']),
  userServices.requestResetPassword,
);

userRoutes.post(
  '/reset-password',
  userValidations(body, ['password', 'confirm_password']),
  userServices.resetPassword,
);

userRoutes.post(
  '/authenticate',
  userValidations(body, ['email', 'password_not_empty']),
  userServices.authenticate,
);

module.exports = userRoutes;
