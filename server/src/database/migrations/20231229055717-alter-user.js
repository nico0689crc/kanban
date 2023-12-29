'use strict';
const { Sequelize } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.addColumn(
      'users',
      'uuid', 
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        after: 'email'
      }
    );
  },
  
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('users');
  }
};