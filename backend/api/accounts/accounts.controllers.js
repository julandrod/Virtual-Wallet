const { catchAsync, endpointResponse } = require("../../helpers");
const accountServices = require("./accounts.services");
const userServices = require("../user");

const registerAccount = catchAsync(async (req, res, next) => {
  const newAccount = await accountServices.createAccount(req.body);

  endpointResponse({
    res,
    code: 201,
    message: "Cuenta creada de manera exitosa",
    body: newAccount,
  });
});

const getAllAccounts = catchAsync(async (req, res, next) => {
  const allAccounts = await accountServices.listAccounts();

  endpointResponse({
    res,
    message: "Cuentas listadas de manera exitosa",
    body: allAccounts,
  });
});

const showCurrentUserAccounts = catchAsync(async (req, res, next) => {
  const user = await userServices.findUserById(req.user.id);
  const activeAccounts = await accountServices.findMyAccounts(user);

  endpointResponse({
    res,
    message: "Cuentas del usuario activo listadas de manera exitosa",
    body: activeAccounts,
  });
});

const getAccountById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const account = await accountServices.findAccountById(id, req.user);

  endpointResponse({
    res,
    message: "Informacion de la cuenta obtenida de manera exitosa",
    body: account,
  });
});

const getAccountAndUpdate = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const account = await accountServices.findAccountById(id, req.user);
  const accountUpdated = await accountServices.updateAccount(account, req.body);

  endpointResponse({
    res,
    message: "Cuenta actualizada de manera exitosa",
    body: accountUpdated,
  });
});

const deleteAccountById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const account = await accountServices.findAccountById(id, req.user);
  const response = await accountServices.deleteAccount(id, account);

  endpointResponse({
    res,
    message: response,
  });
});

const transferToAccount = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { accountId } = req.body;
  const originAccount = await accountServices.findAccountById(
    accountId,
    req.user,
    "origen"
  );
  const transaction = await accountServices.chargeAccount(
    id,
    originAccount,
    req.body
  );

  endpointResponse({
    res,
    message: "Operacion realizada de manera exitosa",
    body: transaction,
  });
});

module.exports = {
  registerAccount,
  getAllAccounts,
  showCurrentUserAccounts,
  transferToAccount,
  getAccountById,
  getAccountAndUpdate,
  deleteAccountById,
};
