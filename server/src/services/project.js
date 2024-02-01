const { Project, User, Section, Task } = require('../models');
const { faker } = require("@faker-js/faker");
const expressValidatorResult = require('../utils/expressValidatorResult');
const ErrorHandler = require("../utils/errorHandler");
const ResponseParser = require("../utils/responseParser");
const ResponseParserError = require("../utils/responseParserError");
const ResponsesTypes = require('../utils/responseTypes');

const getProjects = async (req, res, next) => {
  ErrorHandler(async () => {

    const user = await User.findOne({ where: { email: req.user.email } });

    const { count: totalDocuments, rows: projects } = await Project.findAndCountAll({
      include: [
        { 
          model: Section,  as: 'sections', attributes: Section.getFieldsToSelect(),  
          include: [{ 
            model: Task, as: 'tasks', attributes: Task.getFieldsToSelect() 
          }] 
        }
      ],
      ...(
        (req.query?.page?.number && req.query?.page?.size) ? 
          { 
            offset: (req.query?.page?.number > 0 ? ((req.query?.page?.number - 1) * req.query?.page?.size) : 0) 
          } : {}),
      ...(req.query?.page?.size ? { limit: +req.query?.page?.size } : {}),
      order: [
        ['createdAt', 'DESC'],
      ],
      where: { 
        user_id: user.get().id,
        status: 'active' 
      },
      distinct: true
    });

    const response = new ResponseParser({
      model: Project,
      documents: projects.map(project => project.get()),
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
        { model: User, as: 'user', where: { email: req.user.email }, attributes: User.getFieldsToSelect() },
        { 
          model: Section,  as: 'sections', attributes: Section.getFieldsToSelect(),  
          include: [{ 
            model: Task, as: 'tasks', attributes: Task.getFieldsToSelect() 
          }] 
        }
      ],
      attributes: ['uuid', 'title', 'status'],
      where: { uuid: project_uuid },
    });

    const response = new ResponseParser({
      model: Project,
      documents: project.get(),
      request: req
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
      sections: req.body.sections.map(section => ({
        ...section,
        uuid: faker.string.uuid(),
        tasks: section.tasks.map(task => ({
          ...task,
          labels: JSON.stringify(Object.assign({}, task.labels))
        }))
      }))
    }, {
      include: [{
        model: Section,
        as: 'sections',
        attributes: Section.getFieldsToSelect(),
        include: [{
          model: Task,
          as: 'tasks',
          attributes: Task.getFieldsToSelect()
        }]
      }]
    });

    const response = new ResponseParser({
      model: Project,
      documents: { ...project.get() },
      request: req,
    });

    response.parseDataIndividual();
    response.sendResponseCreateSuccess(res);
  }, next);
}

const deleteProjectByUUID = async (req, res, next) => {
  ErrorHandler(async () => {
    const { project_uuid } = req.params;
    const project = await Project.destroy({ where: { uuid: project_uuid }});

    if(!project) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "Project not found.",
          detail: "Project not found."
        }
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
  deleteProjectByUUID
};