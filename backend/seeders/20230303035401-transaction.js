"use strict";

const { faker } = require("@faker-js/faker");
const { User, Account } = require("../models");
faker.setLocale("es");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const accounts = await Account.findAll();
    const transactions = [];

    for (let account of accounts) {
      for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        const createdAt = faker.date.recent();
        const accountId = account.id;
        const to_account_id = accounts[Math.floor(Math.random() * 21)].id;
        const type = accountId === to_account_id ? "topup" : "payment";

        const transaction = {
          id: faker.datatype.uuid(),
          amount: faker.datatype.number({ min: 10, max: 10000 }),
          concept: faker.finance.transactionDescription(),
          date: faker.date.recent(),
          accountId,
          to_account_id,
          type,
          userId: account.userId,
          createdAt,
          updatedAt: createdAt,
        };
        transactions.push(transaction);
      }
    }

    await queryInterface.bulkInsert("Transactions", [...transactions], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Transactions", null, {});
  },
};
