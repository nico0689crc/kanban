const { Section, Task } = require('../models');
const { faker } = require("@faker-js/faker");
const expressValidatorResult = require('../utils/expressValidatorResult');
const ErrorHandler = require("../utils/errorHandler");
const ResponseParser = require("../utils/responseParser");
const ResponseParserError = require("../utils/responseParserError");
const ResponsesTypes = require('../utils/responseTypes');

const postTask = async (req, res, next) => {
  ErrorHandler(async () => { 
    await expressValidatorResult(req);

    const section = await Section.findOne({ where: { uuid: req.body.section_uuid }});

    if(!section) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "Section not found.",
          detail: "Section not found."
        }
      );
    }
    console.log(section.get().id);

    const task = await Task.create({ 
      title: req.body.title,
      uuid: faker.string.uuid(),
      priority: 'low',
      description: '',
      order: 1,
      sectionId: section.get().id
    });

    const response = new ResponseParser({
      model: Task,
      documents: task.get(),
      request: req,
    });

    response.parseDataIndividual();
    response.sendResponseCreateSuccess(res);
  }, next);
}

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

const deleteTaskByUUID = async (req, res, next) => {
  ErrorHandler(async () => {
    const { task_uuid } = req.params;
    const task = await Task.destroy({ where: { uuid: task_uuid }});

    if(!task) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "task not found.",
          detail: "task not found."
        }
      );
    }

    const response = new ResponseParser({});
    response.sendResponseDeleteSuccess(res);
  }, next);
};

module.exports = {
  updateTaskByUUID,
  deleteTaskByUUID,
  postTask
};