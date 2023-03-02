"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Transaction }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
      this.hasMany(Transaction, { foreignKey: "accountId" });
    }
  }
  Account.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      creationDate: {
        type: DataTypes.DATE,
        get: function () {
          return this.getDataValue("creationDate").toLocaleString("es-CO", {
            timeZone: "UTC",
          });
        },
        defaultValue: DataTypes.NOW,
      },
      money: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        allowNull: false,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Account",
      paranoid: true,
    }
  );
  return Account;
};
