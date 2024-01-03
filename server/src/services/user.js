const { User, Sequelize }  = require('../models');
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

    let activationLink;
    const attributes = req.body;
    const passwordHashed = await bcryptjs.hash(attributes.password, 12);
    const confirmationCode = faker.string.numeric(6);
    const confirmationCodeHashed = await bcryptjs.hash(confirmationCode, 12);

    const user = await User.sequelize.transaction(async () => {
      const user = await User.create({
        ...attributes,
        password: passwordHashed,
        uuid: faker.string.uuid(),
        confirmation_code: confirmationCodeHashed,
        role: User.roles.user,
      }, {
        fields: ['uuid', 'first_name', 'last_name', 'email', 'role', 'avatar', 'password', 'confirmation_code']
      });
  
      activationLink = `${process.env.CLIENT_BASE_URL}/auth/verify?email=${user.dataValues.email}`;
  
      const registrationEmailTemplate = await ejs.renderFile(
        path.join(__dirname, "../emails/registration.ejs"), 
        {
          user_name: user.dataValues.first_name,
          activation_link: activationLink,
          confirmation_code: confirmationCode
        }
      );
  
      await sendEmail(
        user.dataValues.email, 
        `Welcome to Kanban ${user.dataValues.first_name}`, 
        registrationEmailTemplate
      );

      return user;
    });
  
    const response = new ResponseParser({
      model: User,
      documents: {
        ...user.dataValues
      },
      request: req,
    });
    response.parseDataIndividual();
    response.sendResponseGetSuccess(res);
  },next);
};

const verifyUserEmail = async (req, res, next) => {
  ErrorHandler(async () => {
    const { confirmation_code, email } = req.body;
    
    const user = await User.findOne({ where: { email }});

    if(!user){
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "User not found.",
          detail: "User not found."
        }
      );
    }

    if(user.dataValues.email_verified){
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_email_verificated,
        {
          title: "User email verified already.",
          detail: "User email verified already."
        }
      );
    }

    const isValid = await bcryptjs.compare(confirmation_code, user.confirmation_code);

    if(!isValid){
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_email_verificated,
        {
          title: "Confimation code not valid.",
          detail: "Confimation code not valid."
        }
      );
    }

    await User.update(
      { 
        confirmation_code: null, 
        email_verified: true, 
        email_verified_at: Sequelize.fn('NOW'), 
      },
      { where: { email } }
    );
    
    const response = new ResponseParser({});
    response.sendResponseResetPasswordSuccess(res);
  }, next);
};

const requestResetPassword = async (req, res, next) => {
  ErrorHandler(async () => {
    await expressValidatorResult(req);

    const { email } = req.body;
    
    const user = await User.findOne({ where: { email: email }});

    if(!user){
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "User not found.",
          detail: "User not found."
        }
      );
    }

    const passwordResetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetTokenHashed = await bcryptjs.hash(passwordResetToken, 12);
    const passwordResetLink = `${process.env.CLIENT_BASE_URL}/auth/reset-password?uuid=${user.dataValues.uuid}&token=${passwordResetToken}`

    await User.sequelize.transaction(async () => {
      await User.update({ 
        password_reset_token: passwordResetTokenHashed, 
        password_reset_token_req_at: Sequelize.fn('NOW'), 
      },{ 
        where: { uuid: user.dataValues.uuid 
      }});

      const requestPasswordResetEmailTemplate = await ejs.renderFile(
        path.join(__dirname, "../emails/password-reset.ejs"), 
        {
          user_name: user.dataValues.first_name,
          password_reset_link: passwordResetLink
        }
      );
  
      await sendEmail(
        user.dataValues.email, 
        'Password Reset',
        requestPasswordResetEmailTemplate
      );

      return true;
    });

    const response = new ResponseParser({
      model: User,
      documents: {
        ...user.dataValues
      },
      request: req,
    });
    
    response.fieldsToSelect = [];
    response.fieldsToSelect.push("uuid");
    response.fieldsToSelect.push("password_reset_link");
    response.parseDataIndividual();
    response.sendResponseRequestResetPasswordSuccess(res);
  }, next);
};

const resetPassword = async (req, res, next) => {
  ErrorHandler(async () => {
    await expressValidatorResult(req);

    const { password, uuid, token } = req.body;
    
    const user = await User.findOne({ where: { uuid: uuid }});

    if(!user){
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "User not found.",
          detail: "User not found."
        }
      );
    }

    if(!user.dataValues.password_reset_token){
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "User not found with token to reset password.",
          detail: "User not found with token to reset password."
        }
      );
    }

    const isValid = await bcryptjs.compare(token, user.dataValues.password_reset_token);

    if(!isValid){
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_password_token_incorrect,
        {
          title: "Token not valid.",
          detail: "Token not valid."
        }
      );
    }

    const passwordHashed = await bcryptjs.hash(password, 12);

    await User.update({ 
      password_reset_token: null, 
      password_reset_token_req_at: null, 
      password: passwordHashed
    },{ 
      where: { uuid: user.dataValues.uuid }
    });

    const response = new ResponseParser({});
    response.sendResponseResetPasswordSuccess(res);
  }, next);
};

const authenticate = (req, res, next) => {
  ErrorHandler(async () => {
    await expressValidatorResult(req);

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email }});

    if(!user){
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        { title: "User not found.", detail: "User not found." }
      );
    }

    if(!user.dataValues.email_verified){
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        { title: "Email not verified.", detail: "Email not verified." }
      );
    }

    const passwordCheck = await bcryptjs.compare(password, user.dataValues.password);

    if(!passwordCheck){
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        { title: "Password not valid.", detail: "Password not valid." }
      );
    }
    
    const credentials = { userUUID: user.dataValues.uuid, email: user.dataValues.email };
    const jwtKey = process.env.JWT_KEY;
    const token = await jwt.sign(credentials, jwtKey, { expiresIn: +process.env.JWT_EXPIRATION_TIME });

    const response = new ResponseParser({
      model: User,
      documents: { ...user.dataValues, accessToken: token },
      request: req,
    });

    response.fieldsToSelect.push("accessToken");
    response.parseDataIndividual();
    response.sendResponseGetSuccess(res);
  },next);
};

module.exports = {
  getUsers,
  getUserByUUID,
  deleteUserByUUID,
  updateUserByUUID,
  verifyUserEmail,
  registerUser,
  requestResetPassword,
  resetPassword,
  authenticate
};