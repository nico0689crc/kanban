'use strict';
const { Sequelize } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.addColumn(
      'projects',
      'uuid', 
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        after: 'id'
      }
    );
  }
};