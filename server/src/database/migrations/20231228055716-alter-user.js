'use strict';
const { Sequelize } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.addColumn(
      'users',
      'confirmation_code', 
      {
        type: Sequelize.STRING,
        unique: true,
        after: 'token'
      }
    );

    await queryInterface.addColumn(
      'users',
      'role', 
      {
        type: Sequelize.ENUM("admin", "user"),
        defaultValue: "user",
        after: 'confirmation_code'
      }
    );
  },
  
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('users');
  }
};