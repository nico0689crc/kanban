
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

  if(fieldsToValidate.includes('section_uuid')) {
    fieldValidated.push(
      body("section_uuid")
        .trim().notEmpty()
        .withMessage(() => "Please enter task's section.")
    );
  }

  return fieldValidated;
}