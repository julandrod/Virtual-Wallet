const { catchAsync, endpointResponse } = require("../helpers");
const {
  createUser,
  listUsers,
  findUserById,
  findAndUpdateById,
  findAndDeleteById,
  findAndReplacePassword,
  findAccountAndBlock,
} = require("../services/user.services");

const registerUser = catchAsync(async (req, res, next) => {
  const newUser = await createUser(req.body);

  endpointResponse({
    res,
    code: 201,
    message: "Usuario creado de manera exitosa",
    body: newUser,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await listUsers();

  endpointResponse({
    res,
    message: "Usuarios listados de manera exitosa",
    body: allUsers,
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await findUserById(id);

  endpointResponse({
    res,
    message: "Usuario encontrado de manera exitosa",
    body: user,
  });
});

const updateUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await findUserById(id);
  const newUser = await findAndUpdateById(user, req.body, req.user);

  endpointResponse({
    res,
    message: "Usuario actulizado de manera exitosa",
    body: newUser,
  });
});

const deleteUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await findUserById(id);
  const response = await findAndDeleteById(id, user, req.user);

  endpointResponse({
    res,
    message: response,
  });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;
  const response = await findAndReplacePassword(
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
  const account = await findAccountAndBlock(accountId, req.user, url);

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
