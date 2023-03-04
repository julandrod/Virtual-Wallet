const { catchAsync, endpointResponse, isTokenValid } = require("../../helpers");
const { loginUser, findActiveUser } = require("./auth.services");

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const response = await loginUser(email, password);
  
  endpointResponse({
    res,
    code: 200,
    message: "Usuario logueado exitosamente",
    body: response,
  });
});

const showCurrentUser = catchAsync(async (req, res, next) => {
  const activeUser = await findActiveUser(req.user.id);

  endpointResponse({
    res,
    code: 200,
    message: "Informacion del usuario activo",
    body: activeUser,
  });
});

module.exports = { login, showCurrentUser };
