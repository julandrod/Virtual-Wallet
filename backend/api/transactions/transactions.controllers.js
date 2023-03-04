const { userServices } = require("../user");
const { catchAsync, endpointResponse } = require("../../helpers");
const accountServices = require("../accounts");
const transactionServices = require("./transactions.services");

const registerTransaction = catchAsync(async (req, res, next) => {
  await accountServices.findAccountById(req.body.accountId, req.user, "origen");
  await accountServices.findAccountById(
    req.body.to_account_id,
    req.user,
    "destino"
  );

  const transaction = await transactionServices.createNewTransaction({
    userId: req.user.id,
    ...req.body,
  });

  endpointResponse({
    res,
    code: 201,
    message: "Transaccion creada de manera exitosa",
    body: transaction,
  });
});

const listMyTransactions = catchAsync(async (req, res, next) => {
  const user = await userServices.findUserById(req.user.id);
  const accounts = await transactionServices.findMyTransactions(user);

  endpointResponse({
    res,
    message: "Transacciones del usuario activo listadas de manera exitosa",
    body: accounts,
  });
});

const getTransactionById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const transaction = await transactionServices.findTransactionById(
    id,
    req.user
  );

  endpointResponse({
    res,
    message: "Transaccion encontrada de manera exitosa",
    body: transaction,
  });
});

const updateTransactionById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const transaction = await transactionServices.findTransactionById(
    id,
    req.user
  );
  const updatedTransaction = await transactionServices.updateTransaction(
    transaction,
    req.body
  );

  endpointResponse({
    res,
    message: "Transaccion actualizada de manera exitosa",
    body: updatedTransaction,
  });
});

const deleteTransactionById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const transaction = await transactionServices.findTransactionById(
    id,
    req.user
  );
  const response = await transactionServices.deleteTransaction(id, transaction);

  endpointResponse({
    res,
    message: response,
  });
});

module.exports = {
  registerTransaction,
  listMyTransactions,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
};
