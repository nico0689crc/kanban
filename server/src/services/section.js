const { Op } = require("sequelize");
const { Project, Section } = require('../models');
const { faker } = require("@faker-js/faker");
const expressValidatorResult = require('../utils/expressValidatorResult');
const ErrorHandler = require("../utils/errorHandler");
const ResponseParser = require("../utils/responseParser");
const ResponseParserError = require("../utils/responseParserError");
const ResponsesTypes = require('../utils/responseTypes');
const project = require("../validations/project");

const postSection = async (req, res, next) => {
  ErrorHandler(async () => { 
    await expressValidatorResult(req);

    const project = await Project.findOne({ where: { uuid: req.body.project_uuid }});

    if(!project) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "Project not found.",
          detail: "Project not found."
        }
      );
    }
    const sectionsAmount = await project.getSections();

    const section = await Section.create({ 
      title: req.body.title,
      uuid: faker.string.uuid(),
      order: ++sectionsAmount.length,
      projectId: project.get().id
    });

    const response = new ResponseParser({
      model: Section,
      documents: section.get(),
      request: req,
    });

    response.parseDataIndividual();
    response.sendResponseCreateSuccess(res);
  }, next);
}

const updateSectionPositionByUUID = async (req, res, next) => {
  ErrorHandler(async () => {
    await expressValidatorResult(req);

    const { section_uuid } = req.params;
    const { position } = req.body;

    const section = await Section.findOne({ where: { uuid: section_uuid } });

    if(!section) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "Section not found.",
          detail: "Section not found."
        }
      );
    }

    await section.update({ order: +position+1 } );

    const promises = await section.getProject().then(async project => (
      await project.getSections({ where: { id: { [Op.ne]: section.get().id }}}).then(sections => (
        sections.map(section => ({ id: section.id, order: section.order }))
                .sort((a, b) => a.order - b.order)
                .map(({ id }, index) => Section.update({ order: index < +position ? ++index : index+2 }, { where: { id } }))
      ))
    ));

    await Promise.all(promises);

    const response = new ResponseParser({});
    response.sendResponseUpdateSuccess(res);
  }, next);
};

const updateSectionByUUID = async (req, res, next) => {
  ErrorHandler(async () => {
    await expressValidatorResult(req);

    const { section_uuid } = req.params;
    const attributes = req.body;

    const section = await Section.findOne({ where: { uuid: section_uuid } });

    if(!section) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "Section not found.",
          detail: "Section not found."
        }
      );
    }
    
    await section.update({ ...attributes }, { fields: ['title'] });
    
    const response = new ResponseParser({});
    response.sendResponseUpdateSuccess(res);
  }, next);
};

const deleteSectionByUUID = async (req, res, next) => {
  ErrorHandler(async () => {
    const { section_uuid } = req.params;
    const section = await Section.destroy({ where: { uuid: section_uuid }});

    if(!section) {
      throw new ResponseParserError(
        ResponsesTypes.errors.errors_400.error_resource_not_found,
        {
          title: "Section not found.",
          detail: "Section not found."
        }
      );
    }

    const response = new ResponseParser({});
    response.sendResponseDeleteSuccess(res);
  }, next);
};

module.exports = {
  postSection,
  deleteSectionByUUID,
  updateSectionByUUID,
  updateSectionPositionByUUID
};