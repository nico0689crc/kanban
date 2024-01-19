'use strict';

const { faker } = require("@faker-js/faker")
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up ({ context: queryInterface }) {
    await queryInterface.bulkInsert(
      'tasks', 
      (() => [...Array(200)].map(_ => ({
        uuid: faker.string.uuid(),
        title: faker.lorem.sentence({min: 2, max: 5}),
        description: faker.lorem.sentence({min: 10, max: 20}),
        section_id: faker.number.int({ min: 1, max: 200 }),
        status: faker.helpers.enumValue({
          active: 'active', 
          inactive: 'inactive'
        }),
        priority: faker.helpers.enumValue({
          low: 'low', 
          medium: 'medium',
          hight: 'hight'
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
