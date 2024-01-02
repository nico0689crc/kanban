'use strict';
const { Sequelize } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.addColumn(
      'users',
      'email_verified', 
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        after: 'confirmation_code'
      }
    );

    await queryInterface.addColumn(
      'users',
      'email_verified_at', 
      {
        type: Sequelize.DATE,
        after: 'email_verified'
      }
    );

    await queryInterface.addColumn(
      'users',
      'password_reset_token', 
      {
        type: Sequelize.STRING,
        after: 'email_verified_at'
      }
    );

    await queryInterface.addColumn(
      'users',
      'password_reset_token_req_at', 
      {
        type: Sequelize.DATE,
        after: 'password_reset_token'
      }
    );
  },
  
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('users');
  }
};