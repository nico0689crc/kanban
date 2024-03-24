const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.Section, { as: 'section' });
    }

    static getEntity() {
      return 'tasks';
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
    order: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true,
  });

  return Task;
};
