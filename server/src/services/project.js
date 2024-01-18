const { Project, User, Sequelize }  = require('../models');
const ejs = require("ejs");
const path = require("path");
const { faker } = require("@faker-js/faker");
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const expressValidatorResult = require('../utils/expressValidatorResult');
const { sendEmail } = require('../utils/emailSender');
const ErrorHandler = require("../utils/errorHandler");
const ResponseParser = require("../utils/responseParser");
const ResponseParserError = require('../utils/responseParserError');
const ResponsesTypes = require('../utils/responseTypes');
const { where } = require('sequelize');

const getProjects = async (req, res, next) => {
  ErrorHandler(async () => {

    const { count: totalProjects, rows: projects } = await Project.findAndCountAll({
      include: [
        { model: User, where: { email: 'Karl38@gmail.com'}}
      ],
      ...(req.query?.page?.number ? { offset: (req.query?.page?.number > 0 ? req.query?.page?.number - 1 : 0) } : {}),
      ...(req.query?.page?.size ? { limit: +req.query?.page?.size } : {})
    });

    const response = new ResponseParser({
      model: Project,
      documents: projects.map(project => project.get()),
      request: req,
      totalDocuments: totalProjects,
    });
    
    response.parseDataCollection();
    response.sendResponseGetSuccess(res);
  }, next);
};

module.exports = {
  getProjects
};