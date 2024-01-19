'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Section extends Model {

    /** 
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models['Project']);
      this.hasMany(models['Task']);
    }

    static getEntity() {
      return "sections";
    }

    static getFieldsToSelect() {
      return ['uuid', 'title', 'status', 'order'];
    }
  }

  Section.init({
    uuid: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Section',
    tableName: 'sections',
    underscored: true
  });

  return Section;
};