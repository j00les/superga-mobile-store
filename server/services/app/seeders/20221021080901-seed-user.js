'use strict';

const { passHash } = require('../helpers/helpers');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'admin@mail.com',
          password: passHash('admin123'),
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          email: 'admin2@mail.com',
          password: passHash('admin123'),
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'user@mail.com',
          role: 'user',
          password: passHash('user123'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null, {});
  },
};
