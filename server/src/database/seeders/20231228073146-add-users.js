'use strict';

const { faker } = require("@faker-js/faker")
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up ({ context: queryInterface }) {
    // await queryInterface.bulkInsert(
    //   'users', 
    //   (() => [...Array(200)].map(_ => ({
    //     uuid: faker.string.uuid(),
    //     first_name: faker.person.firstName(),
    //     last_name: faker.person.lastName(),
    //     email: faker.internet.email(),
    //     confirmation_code: faker.string.numeric(5),
    //     avatar: faker.internet.avatar(),
    //     password: faker.string.alphanumeric(5),
    //     role: faker.helpers.enumValue({
    //       user: 'user', 
    //       admin: 'admin'
    //     }),
    //   })))(), 
    //   {}
    // );

    await queryInterface.bulkInsert(
      'users', 
      [
        {
          uuid: 'a8776423-bab8-48bc-8132-32f59ff82b76',
          first_name: 'Nicolas',
          last_name: 'Fernandez',
          email: 'nico.06.89crc@gmail.com',
          password: '$2a$12$nyQvFU/JrTdKgiBaMcQU/eN6DmicqvBGRD5WAy.0ZbcmlBAuVQ.la',
          email_verified: 1,
          email_verified_at: '2024-01-19 02:07:45'
        },
        {
          uuid: 'f3195f23-52a6-4487-8666-df632047b014',
          first_name: 'Nicolas 2',
          last_name: 'Fernandez 2',
          email: 'nico.06.89crc+1@gmail.com',
          password: '$2a$12$AnLwsJZXtNaUrYQeyx7STezppeIQNnLoLj4eA/7Glh0MpWQ7gxZny',
          email_verified: 1,
          email_verified_at: '2024-01-19 02:34:09'
        }
      ], 
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
