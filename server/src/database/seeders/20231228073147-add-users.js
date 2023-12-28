'use strict';

const { faker } = require("@faker-js/faker")
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up ({ context: queryInterface }) {
     await queryInterface.bulkInsert('users', [
      {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        token: faker.string.alphanumeric(10),
        confirmation_code: faker.string.numeric(5),
        avatar: faker.internet.avatar(),
        password: faker.string.alphanumeric(5),
        role: faker.helpers.enumValue({
          user: 'user', 
          admin: 'admin'
        }),
       },
       {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        token: faker.string.alphanumeric(10),
        confirmation_code: faker.string.numeric(5),
        avatar: faker.internet.avatar(),
        password: faker.string.alphanumeric(5),
        role: faker.helpers.enumValue({
          user: 'user', 
          admin: 'admin'
        }),
       }
     ], {});
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
