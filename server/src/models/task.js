'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Task extends Model {

    /** 
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models['Section']);
    }

    static getEntity() {
      return "tasks";
    }

    static getFieldsToSelect() {
      return ['uuid', 'title', 'description', 'status', 'priority', 'labels', 'order'];
    }
  }

  Task.init({
    uuid: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    labels: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true
  });

  return Task;
};