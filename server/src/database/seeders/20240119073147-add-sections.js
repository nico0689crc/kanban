'use strict';

const { faker } = require("@faker-js/faker")
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up ({ context: queryInterface }) {
    await queryInterface.bulkInsert(
      'sections', 
      (() => [...Array(200)].map(_ => ({
        uuid: faker.string.uuid(),
        title: faker.lorem.sentence({min: 3, max: 6}),
        project_id: faker.number.int({ min: 1, max: 20 }),
        status: faker.helpers.enumValue({
          active: 'active', 
          inactive: 'inactive'
        }),
        order: faker.number.int({ min: 1, max: 50 }), 
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
