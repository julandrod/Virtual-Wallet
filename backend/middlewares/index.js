const { authenticateUser, authorizePermissions } = require("./auth.middleware");
const errorHandler = require("./error.middleware");
const dataValidator = require("./validator.middleware");

module.exports = {
  authenticateUser,
  authorizePermissions,
  errorHandler,
  dataValidator,
};
