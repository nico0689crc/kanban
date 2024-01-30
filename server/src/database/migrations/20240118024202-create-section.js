'use strict';
const { Sequelize } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.createTable('sections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "active",
      },
      order: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      project_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'projects'
          },
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        allowNull: false
      },
      created_at: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      }
    });
  },
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('sections');
  }
};