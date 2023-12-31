const { validationResult } = require("express-validator");

const ResponsesTypes = require("./responseTypes");
const ResponseParserError = require("./responseParserError");

module.exports = async (req) => {
  const errors = await validationResult(req);

  if (!errors.isEmpty()) {
    throw new ResponseParserError(
      ResponsesTypes.errors.errors_400.error_input_validation,
      ((errors) => errors.errors.map(error => ({
        source: {
          location: error.location,
          pointer: error.param,
          path: error.path,
        },
        title: "Field not valid",
        detail: error.msg,
       }))
      )(errors)
    );
  }
};
