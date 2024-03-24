module.exports = (body, fieldsToValidate = []) => {
  const fieldValidated = [];

  if (fieldsToValidate.includes('title')) {
    fieldValidated.push(
      body('title')
        .trim().notEmpty()
        .withMessage(() => "Please enter project's title."),
    );
  }

  return fieldValidated;
};
