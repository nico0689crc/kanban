
module.exports = (body, fieldsToValidate = []) => {
  const fieldValidated = [];
  
  if(fieldsToValidate.includes('title')) {
    fieldValidated.push(
      body("title")
        .trim().notEmpty()
        .withMessage(() => "Please enter section's title.")
    );
  }

  if(fieldsToValidate.includes('position')) {
    fieldValidated.push(
      body("position")
        .trim().notEmpty()
        .withMessage(() => "Section's position is required.")
    );
  }

  return fieldValidated;
}