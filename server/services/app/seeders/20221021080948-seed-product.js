'use strict';
const { formatSlug } = require('../helpers/helpers');
const data = require('../data.json');

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

    data.products.forEach(el => {
      el.createdAt = el.updatedAt = new Date();
      el.slug = formatSlug(el.name);
    });

    await queryInterface.bulkInsert('Products', data.products, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Products', null, {});
  },
};
