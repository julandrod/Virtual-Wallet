const validateCreateAccount = require("./validateCreateAccount.schema");
const validateCreateTransaction = require("./validateCreateTransaction.schema");
const validateLogin = require("./validateLogin.schema");
const validateRegisterUser = require("./validateRegisterUser.schema");
const validateResetPassword = require("./validateResetPassword.schema");
const validateRol = require("./validateRol.schema");
const validateTransferToAccount = require("./validateTransferToAccount.schema");
const validateUpdateUser = require("./validateUpdateUser.schema");

module.exports = {
  validateCreateAccount,
  validateCreateTransaction,
  validateLogin,
  validateRegisterUser,
  validateResetPassword,
  validateRol,
  validateTransferToAccount,
  validateUpdateUser,
};
