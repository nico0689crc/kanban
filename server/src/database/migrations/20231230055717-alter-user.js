'use strict';
const { Sequelize } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.removeColumn('users', 'token');
  },
  
  async down({ context: queryInterface }) {
    await queryInterface.dropTable('users');
  }
};