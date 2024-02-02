const express = require("express");
const { body } = require("express-validator");
const { sectionServices } = require('../services');
const { sectionValidations } = require('../validations');

const sectionRoutes = express.Router();

sectionRoutes.patch(
  "/:section_uuid",
  sectionValidations(body, ["title"]), 
  sectionServices.updateSectionByUUID
);

sectionRoutes.patch(
  "/:section_uuid/change-section-position",
  sectionValidations(body, ["position"]),
  sectionServices.updateSectionPositionByUUID
);

sectionRoutes.delete(
  "/:section_uuid", 
  sectionServices.deleteSectionByUUID
);

sectionRoutes.post(
  "/",
  sectionValidations(body, ["title"]),  
  sectionServices.postSection
);

module.exports = sectionRoutes;