
module.exports = (body, fieldsToValidate = []) => {
  const fieldValidated = [];
  
  if(fieldsToValidate.includes('title')) {
    fieldValidated.push(
      body("title")
        .trim().notEmpty()
        .withMessage(() => "Please enter task's title.")
    );
  }

  if(fieldsToValidate.includes('description')) {
    fieldValidated.push(
      body("description")
        .trim().notEmpty()
        .withMessage(() => "Please enter task's description.")
    );
  }

  if(fieldsToValidate.includes('priority')) {
    fieldValidated.push(
      body("priority")
        .trim().notEmpty()
        .withMessage(() => "Please enter task's priority.")
    );
  }

  return fieldValidated;
}