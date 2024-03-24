const { Sequelize } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.addColumn(
      'users',
      'password',
      {
        type: Sequelize.STRING,
        allowNull: false,
        after: 'email',
      },
    );

    await queryInterface.addColumn(
      'users',
      'avatar',
      {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'password',
      },
    );
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable('users');
  },
};
