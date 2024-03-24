const { faker } = require('@faker-js/faker');
const {
  Project, User, Section, Task,
} = require('../models');
const expressValidatorResult = require('../utils/expressValidatorResult');
const ErrorHandler = require('../utils/errorHandler');
const ResponseParser = require('../utils/responseParser');
const ResponseParserError = require('../utils/responseParserError');
const ResponsesTypes = require('../utils/responseTypes');

const { projects } = require('./mock/projects');

const getSeedProjects = async (req, res, next) => {
  ErrorHandler(async () => {
    const userAdmin = await User.findOne({ where: { email: req.user.email } });

    if (userAdmin.get().email !== process.env.EMAIL_FROM_ADMINISTRATOR) {
      throw new Error('Unauthorized');
    }

    const user = await User.findOne({ where: { email: process.env.USER_DEMO } });

    const promises = projects.map((project) => Project.create({
      uuid: faker.string.uuid(),
      title: project.title,
      user_id: user.get().id,
      sections: project.sections.map((section, index) => ({
        uuid: faker.string.uuid(),
        title: section.title,
        order: ++index,
        status: 'active',
        tasks: section.tasks.map((task, index) => ({
          uuid: faker.string.uuid(),
          title: task.title,
          description: task.description,
          labels: JSON.stringify(task.tags),
          status: faker.helpers.enumValue({
            active: 'active',
            inactive: 'inactive',
          }),
          priority: task.priority,
          order: ++index,
        })),
      })),
    }, {
      include: [{
        model: Section,
        as: 'sections',
        attributes: Section.getFieldsToSelect(),
        include: [{
          model: Task,
          as: 'tasks',
          attributes: Task.getFieldsToSelect(),
        }],
      }],
    }));

    await Promise.all(promises);

    return res.status(200).json({ message: 'OK' });
  }, next);
};

const getProjects = async (req, res, next) => {
  ErrorHandler(async () => {
    const user = await User.findOne({ where: { email: req.user.email } });

    const { count: totalDocuments, rows: projects } = await Project.findAndCountAll({
      include: [
        {
          model: Section,
          as: 'sections',
          attributes: Section.getFieldsToSelect(),
          include: [{
            model: Task, as: 'tasks', attributes: Task.getFieldsToSelect(),
          }],
        },
      ],
      ...(
        (req.query?.page?.number && req.query?.page?.size)
          ? {
            offset: (req.query?.page?.number > 0 ? ((req.query?.page?.number - 1) * req.query?.page?.size) : 0),
          } : {}),
      ...(req.query?.page?.size ? { limit: +req.query?.page?.size } : {}),
      order: [
        ['createdAt', 'DESC'],
      ],
      where: {
        user_id: user.get().id,
        status: 'active',
      },
      distinct: true,
    });

    const response = new ResponseParser({
      model: Project,
      documents: projects.map((project) => project.get()),
      request: req,
      totalDocuments,
    });

    response.parseDataCollection();
    response.sendResponseGetSuccess(res);
  }, next);
};

const getProjectByUUID = async (req, res, next) => {
  ErrorHandler(async () => {
    const { project_uuid } = req.params;

    const project = await Project.findOne({
      include: [
        {
          model: User, as: 'user', where: { email: req.user.email }, attributes: User.getFieldsToSelect(),
        },
        {
          model: Section,
          as: 'sections',
          attributes: Section.getFieldsToSelect(),
          include: [{
            model: Task, as: 'tasks', attributes: Task.getFieldsToSelect(),
          }],

        },
      ],
      attributes: ['uuid', 'title', 'status'],
      where: { uuid: project_uuid },
      order: [
        [{ model: Section, as: 'sections' }, 'order', 'ASC'],
        [{ model: Section, as: 'sections' }, { model: Task, as: 'tasks' }, 'order', 'ASC'],
      ],
    });

    if (!project) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: 'Project not found.',
          detail: 'Project not found.',
        },
      );
    }

    const response = new ResponseParser({
      model: Project,
      documents: project.get(),
      request: req,
    });

    response.parseDataIndividual();
    response.sendResponseGetSuccess(res);
  }, next);
};

const postProject = async (req, res, next) => {
  ErrorHandler(async () => {
    await expressValidatorResult(req);

    const user = await User.findOne({ where: { email: req.user.email } });

    const project = await Project.create({
      title: req.body.title,
      uuid: faker.string.uuid(),
      userId: user.get().id,
      sections: req.body.sections.map((section) => ({
        ...section,
        uuid: faker.string.uuid(),
        tasks: section.tasks.map((task) => ({
          ...task,
          labels: JSON.stringify({ ...task.labels }),
        })),
      })),
    }, {
      include: [{
        model: Section,
        as: 'sections',
        attributes: Section.getFieldsToSelect(),
        include: [{
          model: Task,
          as: 'tasks',
          attributes: Task.getFieldsToSelect(),
        }],
      }],
    });

    const response = new ResponseParser({
      model: Project,
      documents: { ...project.get() },
      request: req,
    });

    response.parseDataIndividual();
    response.sendResponseCreateSuccess(res);
  }, next);
};

const deleteProjectByUUID = async (req, res, next) => {
  ErrorHandler(async () => {
    const { project_uuid } = req.params;
    const project = await Project.destroy({ where: { uuid: project_uuid } });

    if (!project) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: 'Project not found.',
          detail: 'Project not found.',
        },
      );
    }

    const response = new ResponseParser({});
    response.sendResponseDeleteSuccess(res);
  }, next);
};

module.exports = {
  getProjects,
  getProjectByUUID,
  postProject,
  deleteProjectByUUID,
  getSeedProjects,
};
