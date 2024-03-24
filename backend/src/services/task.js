const { Op } = require('sequelize');
const { faker } = require('@faker-js/faker');
const { Section, Task } = require('../models');
const expressValidatorResult = require('../utils/expressValidatorResult');
const ErrorHandler = require('../utils/errorHandler');
const ResponseParser = require('../utils/responseParser');
const ResponseParserError = require('../utils/responseParserError');
const ResponsesTypes = require('../utils/responseTypes');

const postTask = async (req, res, next) => {
  ErrorHandler(async () => {
    await expressValidatorResult(req);

    const section = await Section.findOne({ where: { uuid: req.body.section_uuid } });

    if (!section) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: 'Section not found.',
          detail: 'Section not found.',
        },
      );
    }
    const taskAmount = await section.getTasks();

    const task = await Task.create({
      title: req.body.title,
      uuid: faker.string.uuid(),
      priority: 'low',
      description: '',
      order: ++taskAmount.length,
      sectionId: section.get().id,
    });

    const response = new ResponseParser({
      model: Task,
      documents: task.get(),
      request: req,
    });

    response.parseDataIndividual();
    response.sendResponseCreateSuccess(res);
  }, next);
};

const updateTaskPositionByUUID = async (req, res, next) => {
  ErrorHandler(async () => {
    await expressValidatorResult(req);

    const { task_uuid } = req.params;
    const { origin_section_uuid, destination_section_uuid, position } = req.body;

    const task = await Task.findOne({ where: { uuid: task_uuid } });

    if (!task) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: 'Task not found.',
          detail: 'Task not found.',
        },
      );
    }

    const origin_section = await Section.findOne({
      where: { uuid: origin_section_uuid },
      attributes: ['id', ...Section.getFieldsToSelect()],
    });

    const destination_section = await Section.findOne({
      where: { uuid: destination_section_uuid },
      attributes: ['id', ...Section.getFieldsToSelect()],
    });

    if (!origin_section_uuid) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: 'Section origin not found.',
          detail: 'Section origin not found.',
        },
      );
    }

    if (!destination_section) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: 'Section destination not found.',
          detail: 'Section destination not found.',
        },
      );
    }

    await task.update({ sectionId: destination_section.get().id, order: +position + 1 });

    const promises = [];

    if (origin_section_uuid !== destination_section) {
      const originTasks = await origin_section
        .getTasks()
        .then((tasks) => tasks.map((task) => ({ id: task.id, order: task.order }))
          .sort((a, b) => a.order - b.order)
          .map(({ id }, index) => Task.update({ order: ++index }, { where: { id } })));
      promises.push(...originTasks);
    }

    const destinationTasks = await destination_section
      .getTasks({ where: { id: { [Op.ne]: task.get().id } } })
      .then((tasks) => tasks
        .map((task) => ({ id: task.id, order: task.order }))
        .sort((a, b) => a.order - b.order)
        .map(({ id }, index) => Task.update({ order: index < +position ? ++index : index + 2 }, { where: { id } })));
    promises.push(...destinationTasks);

    await Promise.all(promises);

    const response = new ResponseParser({});
    response.sendResponseUpdateSuccess(res);
  }, next);
};

const updateTaskByUUID = async (req, res, next) => {
  ErrorHandler(async () => {
    await expressValidatorResult(req);

    const { task_uuid } = req.params;
    const attributes = req.body;

    const task = await Task.findOne({ where: { uuid: task_uuid } });

    if (!task) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: 'Task not found.',
          detail: 'Task not found.',
        },
      );
    }

    await Task.update({
      ...attributes,
      labels: JSON.stringify(attributes.labels),
    }, {
      where: { uuid: task_uuid }, fields: ['title', 'description', 'priority', 'labels'],
    });

    const response = new ResponseParser({});
    response.sendResponseUpdateSuccess(res);
  }, next);
};

const deleteTaskByUUID = async (req, res, next) => {
  ErrorHandler(async () => {
    const { task_uuid } = req.params;
    const task = await Task.destroy({ where: { uuid: task_uuid } });

    if (!task) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: 'task not found.',
          detail: 'task not found.',
        },
      );
    }

    const response = new ResponseParser({});
    response.sendResponseDeleteSuccess(res);
  }, next);
};

module.exports = {
  updateTaskByUUID,
  updateTaskPositionByUUID,
  deleteTaskByUUID,
  postTask,
};
