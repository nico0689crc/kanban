const fs = require("fs");
const ResponseParserError = require("./responseParserError");

module.exports = (error, req, res, next) => {
  if (req.files) {
    for (const file of req.files) {
      fs.unlink(file.path, err => {});
    }
  }

  if (error instanceof ResponseParserError) {
    res.status(error.httpStatusCode).json({ errors: error.getResponseBody() });
  }
};
