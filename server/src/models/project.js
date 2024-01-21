'use strict';

const { Model, DataTypes } = require('sequelize');
const { User } = require('./index');


module.exports = (sequelize) => {
  class Project extends Model {
    
    static associate(models) {
      this.belongsTo(models['User'], { as: 'user' });
      this.hasMany(models['Section'], { as: 'sections' });
    }

    static getEntity() {
      return "projects";
    }

    static getFieldsToSelect() {
      return ['uuid', 'title', 'status', 'sections', 'createdAt'];
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