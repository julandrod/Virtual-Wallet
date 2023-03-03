const { ErrorObject, checkPermissions } = require("../helpers");
const {  Transaction } = require("../models");

const createNewTransaction = async (info) => {
  try {
    const { amount, concept, type, accountId, to_account_id, userId } = info;

    const transaction = await Transaction.create({
      amount,
      concept,
      type,
      accountId,
      userId,
      to_account_id,
    });

    return transaction;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const findMyTransactions = async (user) => {
  try {
    const accounts = await user.getTransactions();
    return accounts;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const findTransactionById = async (id, reqUser) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id },
    });
    if (!transaction) {
      throw new ErrorObject(
        "No se encontro ninguna transaccion con este id",
        404
      );
    }
    checkPermissions(reqUser, transaction.userId);
    return transaction;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const updateTransaction = async (transaction, newInfo) => {
  try {
    const { concept } = newInfo;
    transaction.concept = concept;
    await transaction.save();

    return transaction;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const deleteTransaction = async (id, transaction) => {
  try {
    await transaction.destroy();
    return `Transaccion #${id} eliminada de manera exitosa`;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

module.exports = {
  createNewTransaction,
  findMyTransactions,
  findTransactionById,
  updateTransaction,
  deleteTransaction,
};
