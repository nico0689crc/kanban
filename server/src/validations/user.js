const { User }  = require('../models');

module.exports = (body, fieldsToValidate = []) => {
  const fieldValidated = [];
  
  if(fieldsToValidate.includes('first_name')) {
    fieldValidated.push(
      body("first_name")
        .trim().notEmpty()
        .withMessage(() => "Please enter your first name.")
    );
  }

  if(fieldsToValidate.includes('last_name')) {
    fieldValidated.push(
      body("last_name")
        .trim().notEmpty()
        .withMessage(() => "Please enter your last name.")
    );
  }

  if(fieldsToValidate.includes('email')) {
    fieldValidated.push(
      body("email")
        .isEmail()
        .withMessage(() => "Please use a valid email address.")
    );
  }

  if(fieldsToValidate.includes('email_unique')) {
    fieldValidated.push(
      body("email")
        .isEmail()
        .withMessage(() => "Please use a valid email address.")
        .custom(async (value, { req }) => {
          const user = await User.findOne({ where: { email: req.body.email }});

          if (user) {
            return Promise.reject("This email address is used already.");
          }
        })
        .withMessage(() => "This email address is used already."),
    );
  }

  if(fieldsToValidate.includes('password_not_empty')) {
    fieldValidated.push(
      body("password")
        .trim().notEmpty()
        .withMessage(() => "Please enter your password.")
    );
  }

  if(fieldsToValidate.includes('password')) {
    fieldValidated.push(
      body("password")
      .custom(async (value, { req }) => {
        const passwordPattern = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);

        if (!passwordPattern.test(req.body.password)) {
          return Promise.reject("");
        }
      })
      .withMessage(() => "Enter a password 6 to 16 characters long (1 number, 1 special character, 1 uppercase, and 1 lowercase)"),
    );
  }

  return fieldValidated;
}