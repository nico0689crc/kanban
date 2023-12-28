'use strict';
const { Sequelize } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.addColumn(
      'Users',
      'token', 
      {
        type: Sequelize.STRING,
        after: 'email'
      }
    );
  },
  
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('Users');
  }
};