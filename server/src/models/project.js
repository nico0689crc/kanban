'use strict';

const { Model, DataTypes } = require('sequelize');
const { User } = require('./index');


module.exports = (sequelize) => {
  class Project extends Model {

    /** 
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models['User']);
      this.hasMany(models['Section']);
    }

    static getEntity() {
      return "projects";
    }

    static getFieldsToSelect() {
      return ['uuid', 'title', 'status'];
    }
  }

  Project.init({
    uuid: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    underscored: true
  });

  return Project;
};