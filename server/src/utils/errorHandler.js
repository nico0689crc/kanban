const ResponseParserError = require("./responseParserError");
const ResponsesTypes = require("./responseTypes");

async function ErrorHandler(callback, next) {
  try {
    await callback();
  } catch (error) {
    if (error instanceof ResponseParserError) {
      return next(error);
    }

    return next(
      new ResponseParserError(
        ResponsesTypes.errors.errors_500.error_internal_error,
        error.message
      )
    );
  }
}

module.exports = ErrorHandler;
