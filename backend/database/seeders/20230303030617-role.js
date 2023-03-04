"use strict";

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
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
      "Roles",
      [
        {
          id: 1,
          name: "admin",
          description: "Usuario con privilegios de administrador",
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent(),
        },
        {
          id: 2,
          name: "standard",
          description: "Usuario con privilegios de estandar",
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent(),
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
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
