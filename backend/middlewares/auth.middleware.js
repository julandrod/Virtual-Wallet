const { catchAsync, ErrorObject, isTokenValid } = require("../helpers");

const authenticateUser = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ErrorObject("No hay un token presente", 401));
  }

  const token = authHeader.split(" ")[1];
  try {
    const payloadDecoded = isTokenValid(token);
    req.user = { ...payloadDecoded };
    next();
  } catch (error) {
    throw new ErrorObject("El token no es valido", 401);
  }
});

const authorizePermissions = (role) => {
  return (req, res, next) => {
    if (req.user.roleId !== role) {
      throw new ErrorObject("No esta autorizado para acceder a esta ruta", 401);
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
