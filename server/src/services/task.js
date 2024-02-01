const { Project, User, Section, Task } = require('../models');
const expressValidatorResult = require('../utils/expressValidatorResult');
const ErrorHandler = require("../utils/errorHandler");
const ResponseParser = require("../utils/responseParser");
const ResponseParserError = require("../utils/responseParserError");
const ResponsesTypes = require('../utils/responseTypes');

const updateTaskByUUID = async (req, res, next) => {
  ErrorHandler(async () => {
    await expressValidatorResult(req);

    const { task_uuid } = req.params;
    const attributes = req.body;

    const task = await Task.findOne({ where: { uuid: task_uuid } });

    if(!task) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "Task not found.",
          detail: "Task not found."
        }
      );
    }
    
    await Task.update({
      ...attributes,
      labels: JSON.stringify(attributes.labels)
    }, { 
      where: { uuid: task_uuid }, fields: ['title', 'description', 'priority', 'labels'],
      returning: true,
      plain: true 
    });
    
    const response = new ResponseParser({});
    response.sendResponseUpdateSuccess(res);
  }, next);
};

module.exports = {
  updateTaskByUUID
};