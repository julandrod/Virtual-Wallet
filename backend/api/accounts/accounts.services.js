const { ErrorObject, checkPermissions } = require("../../helpers");
const { Account, User } = require("../../database/models");
const { createNewTransaction } = require("../transactions/transactions.services");

const createAccount = async (info) => {
  try {
    const { money, isBlocked, userId } = info;
    const user = await User.findOne({ where: { id: userId } });
    const response = await user.createAccount({ money, isBlocked });

    return response;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const listAccounts = async () => {
  try {
    const accounts = await Account.findAndCountAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    return accounts;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const findMyAccounts = async (user) => {
  try {
    const accounts = await user.getAccounts();
    return accounts;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const findAccountById = async (id, reqUser, compText) => {
  try {
    const account = await Account.findOne({
      where: { id },
    });

    if (!account) {
      throw new ErrorObject(
        `No se encontro ninguna cuenta ${compText ? compText : ""} con este Id`,
        404
      );
    }

    checkPermissions(reqUser, account.userId);

    return account;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const updateAccount = async (account, newInfo) => {
  try {
    const { money, isBlocked, userId } = newInfo;
    await account.update({ money, isBlocked, userId });

    return account;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const deleteAccount = async (id, account) => {
  try {
    await account.destroy();
    return `Cuenta #${id} eliminada de manera exitosa`;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const chargeAccount = async (destinationId, originAccount, info) => {
  try {
    const destinationAccount = await Account.findOne({
      where: { id: destinationId },
    });
    if (!destinationAccount) {
      throw new ErrorObject(
        "No se encontro ninguna cuenta destino con este Id",
        404
      );
    }

    const { concept, amount } = info;

    const type =
      destinationAccount.id === originAccount.id ? "topup" : "payment";

    if (destinationAccount.isBlocked && originAccount.isBlocked) {
      throw new ErrorObject(
        "No se puede realizar la operacion, ambas cuentas estan bloqueadas"
      );
    } else if (destinationAccount.isBlocked) {
      throw new ErrorObject(
        "No se puede realizar la operacion, la cuenta destino esta bloqueada"
      );
    } else if (originAccount.isBlocked) {
      throw new ErrorObject(
        "No se puede realizar la operacion, la cuenta origen esta bloqueada"
      );
    }

    if (type === "topup") {
      destinationAccount.money += amount;
    }
    if (type === "payment") {
      if (originAccount.money < amount) {
        throw new ErrorObject(
          "No posee fondos suficientes para realizar esta operacion"
        );
      }
      destinationAccount.money += amount;
      originAccount.money -= amount;
    }

    const transaction = await createNewTransaction({
      amount,
      concept,
      type,
      accountId: originAccount.id,
      to_account_id: destinationAccount.id,
      userId: originAccount.userId,
    });

    await originAccount.save();
    await destinationAccount.save();

    return transaction;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

module.exports = {
  createAccount,
  listAccounts,
  findMyAccounts,
  chargeAccount,
  findAccountById,
  updateAccount,
  deleteAccount,
};
