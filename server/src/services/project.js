const { Project, User, Section, Task, Sequelize }  = require('../models');
const { faker } = require("@faker-js/faker");
const expressValidatorResult = require('../utils/expressValidatorResult');
const ErrorHandler = require("../utils/errorHandler");
const ResponseParser = require("../utils/responseParser");
const ResponseParserError = require('../utils/responseParserError');
const ResponsesTypes = require('../utils/responseTypes');

const getProjects = async (req, res, next) => {
  ErrorHandler(async () => {

    const { count: totalProjects, rows: projects } = await Project.findAndCountAll({
      include: [
        { model: User, where: { email: req.user.email } }
      ],
      ...(req.query?.page?.number ? { offset: (req.query?.page?.number > 0 ? req.query?.page?.number - 1 : 0) } : {}),
      ...(req.query?.page?.size ? { limit: +req.query?.page?.size } : {})
    });

    const response = new ResponseParser({
      model: Project,
      documents: projects.map(project => project.get()),
      request: req,
      totalDocuments: totalProjects,
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
        { model: User, where: { email: req.user.email } },
        { model: Section, include: [
          { model: Task }
        ] }
      ],
      where: { uuid: project_uuid }
    });

    return res.status(200).json(project);
  }, next);
};

module.exports = {
  getProjects,
  getProjectByUUID
};