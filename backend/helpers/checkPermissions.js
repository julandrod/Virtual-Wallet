const ErrorObject = require("./error");

const checkPermissions = (reqUser, resourceUserId) => {
  if (reqUser.roleId === 1) return;
  if (reqUser.id === resourceUserId) return;

  throw new ErrorObject("No esta autorizado para acceder a esta ruta", 401);
};

module.exports = checkPermissions;
