const { User }  = require('../models');
const { faker } = require("@faker-js/faker");
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const expressValidatorResult = require('../utils/expressValidatorResult');
const ErrorHandler = require("../utils/errorHandler");
const ResponseParser = require("../utils/responseParser");
const ResponseParserError = require('../utils/responseParserError');
const ResponsesTypes = require('../utils/responseTypes');

const getUsers = async (req, res, next) => {
  ErrorHandler(async () => {
    const { count: totalUsers, rows: users } = await User.findAndCountAll({
      ...(req.query?.page?.number ? { offset: +req.query?.page?.number } : {}),
      ...(req.query?.page?.size ? { limit: +req.query?.page?.size } : {})
    });

    const response = new ResponseParser({
      model: User,
      documents: users.map(user => user.dataValues),
      request: req,
      totalDocuments: totalUsers,
    });
    
    response.parseDataCollection();
    response.sendResponseGetSuccess(res);
  }, next);
};

const getUserByUUID = async (req, res, next) => {
  ErrorHandler(async () => {
    const { user_uuid } = req.params;
    const user = await User.findOne({ where: { uuid: user_uuid }});

    if(!user) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "User not found.",
          detail: "User not found."
        }
      );
    }

    const response = new ResponseParser({
      model: User,
      documents: user.dataValues,
      request: req
    });
    
    response.parseDataIndividual();
    response.sendResponseGetSuccess(res);
  }, next);
};

const deleteUserByUUID = async (req, res, next) => {
  ErrorHandler(async () => {
    const { user_uuid } = req.params;
    const user = await User.destroy({ where: { uuid: user_uuid }});

    if(!user) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "User not found.",
          detail: "User not found."
        }
      );
    }

    const response = new ResponseParser({});
    response.sendResponseDeleteSuccess(res);
  }, next);
};

const updateUserByUUID = async (req, res, next) => {
  ErrorHandler(async () => {
    await expressValidatorResult(req);

    const { user_uuid } = req.params;
    const attributes = req.body;
    
    const userID = await User.update(
      attributes,
      { where: { uuid: user_uuid }, fields: ['first_name', 'last_name', 'avatar'] }
    );

    if(!userID[0]) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "User not found.",
          detail: "User not found."
        }
      );
    }
    
    const user = await User.findByPk(userID[0]);

    const response = new ResponseParser({
      model: User,
      documents: user.dataValues,
      request: req,
    });
    
    response.parseDataIndividual();
    response.sendResponseUpdateSuccess(res);
  }, next);
};

const registerUser = (req, res, next) => {
  ErrorHandler(async () => {
    await expressValidatorResult(req);

    const attributes = req.body;

    const passwordHashed = await bcryptjs.hash(attributes.password, 12);
    
    const confirmationCode = crypto.randomBytes(32).toString("hex");
    const confirmationCodeHashed = await bcryptjs.hash(confirmationCode, 12);
  
    const user = await User.create({
      ...attributes,
      password: passwordHashed,
      uuid: faker.string.uuid(),
      confirmation_code: confirmationCodeHashed,
      role: User.roles.user,
    }, {
      fields: ['uuid', 'first_name', 'last_name', 'email', 'role', 'avatar', 'password', 'confirmation_code']
    });
  
    const credentials = { userUUID: user.uuid, email: user.email };
    const jwtKey = process.env.JWT_KEY;
    const token = await jwt.sign(credentials, jwtKey, { expiresIn: process.env.JWT_EXPIRATION_TIME });

    const response = new ResponseParser({
      model: User,
      documents: {
        ...user.dataValues,
        token: token
      },
      request: req,
    });

    response.fieldsToSelect.push("token");
    response.parseDataIndividual();
    response.sendResponseGetSuccess(res);
  },next);
};

module.exports = {
  getUsers,
  getUserByUUID,
  deleteUserByUUID,
  updateUserByUUID,
  registerUser
};