'use strict';
const { Sequelize } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.addColumn(
      'Users',
      'status', 
      {
        type: Sequelize.ENUM("pending", "cancelled", "paid"),
        defaultValue: 'pending',
        after: 'token'
      }
    );
  },
  
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('Users');
  }
};