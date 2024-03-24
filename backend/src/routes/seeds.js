const express = require('express');
const { userServices } = require('../services');

const seedsRoutes = express.Router();

seedsRoutes.get('/register-user-demo', userServices.registerUserDemo);

module.exports = seedsRoutes;
