'use strict';
const { Sequelize } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.addColumn(
      'Users',
      'confirmation_code', 
      {
        type: Sequelize.STRING,
        unique: true,
        after: 'status'
      }
    );

    await queryInterface.addColumn(
      'Users',
      'role', 
      {
        type: Sequelize.ENUM("admin", "user"),
        defaultValue: "user",
      }
    );
  },
  
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('Users');
  }
};