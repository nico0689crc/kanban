
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

  if(fieldsToValidate.includes('origin_section_uuid')) {
    fieldValidated.push(
      body("origin_section_uuid")
        .trim().notEmpty()
        .withMessage(() => "Section origin of the task is required.")
    );
  }

  if(fieldsToValidate.includes('destination_section_uuid')) {
    fieldValidated.push(
      body("destination_section_uuid")
        .trim().notEmpty()
        .withMessage(() => "Section destination of the task is required.")
    );
  }

  if(fieldsToValidate.includes('position')) {
    fieldValidated.push(
      body("position")
        .trim().notEmpty()
        .withMessage(() => "Task's position is required.")
    );
  }

  return fieldValidated;
}