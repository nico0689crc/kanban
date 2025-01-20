const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {
  userRoutes, projectRoutes, taskRoutes, sectionRoutes, seedRoutes
} = require('./routes');
const { authenticateUser } = require('./middleware');
const globalHandleError = require('./utils/globalHandleError');

app.use(cors());
app.use(bodyParser.json());

// Public Routes
app.use('/api/users', userRoutes);

// Protected Routes
app.use(authenticateUser);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/seeds', seedRoutes);

// Global Error Handler
app.use(globalHandleError);

module.exports = app;
