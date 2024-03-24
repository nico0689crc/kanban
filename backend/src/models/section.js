const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Section extends Model {
    static associate(models) {
      this.belongsTo(models.Project, { as: 'project' });
      this.hasMany(models.Task, { as: 'tasks' });
    }

    static getEntity() {
      return 'sections';
    }

    static getFieldsToSelect() {
      return ['uuid', 'title', 'status', 'order'];
    }
  }

  Section.init({
    uuid: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    order: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Section',
    tableName: 'sections',
    underscored: true,
  });

  return Section;
};
