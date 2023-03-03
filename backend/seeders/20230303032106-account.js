"use strict";

const { User } = require("../models");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({ attributes: ["id"] });
    const userIds = users.map((user) => user.id);
    const accounts = [];

    for (let i = 0; i < 21; i++) {
      const createdAt = faker.date.recent();
      const account = {
        id: faker.datatype.uuid(),
        creationDate: faker.date.recent(),
        money: faker.datatype.number({ min: 10, max: 10000 }),
        isBlocked: false,
        userId: userIds[i],
        createdAt,
        updatedAt: createdAt,
      };
      accounts.push(account);
    }

    await queryInterface.bulkInsert("Accounts", [...accounts], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Accounts", null, {});
  },
};
