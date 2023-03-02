"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Account }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Account, { foreignKey: "accountId" });
    }
  }
  Transaction.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      concept: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        get: function () {
          return this.getDataValue("date").toLocaleString("es-CO", {
            timeZone: "UTC",
          });
        },
        defaultValue: DataTypes.NOW,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["topup", "payment"]],
        },
      },
      to_account_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      paranoid: true,
    }
  );
  return Transaction;
};
