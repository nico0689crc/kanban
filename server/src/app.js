const express = require("express");
const initDatabase = require("./database/database");

const app = express();

initDatabase(app);

module.exports = app;