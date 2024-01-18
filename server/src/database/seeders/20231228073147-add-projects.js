'use strict';

const { faker } = require("@faker-js/faker")
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up ({ context: queryInterface }) {
    await queryInterface.bulkInsert(
      'projects', 
      (() => [...Array(20)].map(_ => ({
        uuid: faker.string.uuid(),
        title: faker.lorem.sentence({min: 3, max: 6}),
        user_id: 1
      })))(), 
      {}
    );
  },


  

  async down ({ context: queryInterface }) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
