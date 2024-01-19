const { verify } = require("jsonwebtoken");
const ResponseParserError = require("../utils/responseParserError");
const ResponsesTypes = require("../utils/responseTypes");

module.exports = async (req, res, next) => {
  const authorizationHeader = req?.headers?.authorization;

  if (!authorizationHeader) {
    return next(new ResponseParserError(
      ResponsesTypes.errors.errors_400.error_token_no_provided, 
      {
        title: "Token not provided",
        detail: "Token not provided",
      }
    ));
  }

  const token = authorizationHeader.split(" ")[1];

  const tokenDecodedPayload = verify(token, process.env.JWT_KEY, (error, decoded) => {
    if(error){
      return next(new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_token_invalid, 
        {
          title: "Token not valid",
          detail: "Token not valid",
        }
      ));
    }
    
    return decoded;
  });

  req.user = tokenDecodedPayload ;

  next();
}