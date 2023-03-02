"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      concept: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        get: function () {
          return this.getDataValue("date").toLocaleString("es-CO", {
            timeZone: "UTC",
          });
        },
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      to_account_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Transactions");
  },
};
