const { catchAsync, endpointResponse } = require("../../helpers");
const userServices = require("./index");

const registerUser = catchAsync(async (req, res, next) => {
  const newUser = await userServices.createUser(req.body);

  endpointResponse({
    res,
    code: 201,
    message: "Usuario creado de manera exitosa",
    body: newUser,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await userServices.listUsers();

  endpointResponse({
    res,
    message: "Usuarios listados de manera exitosa",
    body: allUsers,
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await userServices.findUserById(id);

  endpointResponse({
    res,
    message: "Usuario encontrado de manera exitosa",
    body: user,
  });
});

const updateUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await userServices.findUserById(id);
  const newUser = await userServices.findAndUpdateById(
    user,
    req.body,
    req.user
  );

  endpointResponse({
    res,
    message: "Usuario actulizado de manera exitosa",
    body: newUser,
  });
});

const deleteUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await userServices.findUserById(id);
  const response = await userServices.findAndDeleteById(id, user, req.user);

  endpointResponse({
    res,
    message: response,
  });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;
  const response = await userServices.findAndReplacePassword(
    req.user,
    userId,
    oldPassword,
    newPassword
  );

  endpointResponse({
    res,
    message: response,
  });
});

const blockAccount = catchAsync(async (req, res, next) => {
  const { accountId } = req.params;
  const url = req.url.split("/")[1];
  const account = await userServices.findAccountAndBlock(
    accountId,
    req.user,
    url
  );

  endpointResponse({
    res,
    message: `Cuenta #${accountId} ${
      url === "block" ? "bloqueada" : "desbloqueada"
    }`,
    body: account,
  });
});

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  resetPassword,
  blockAccount,
};
