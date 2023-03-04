const accountControllers = require("./accounts.controllers");
const accountSchemas = require("./account.schemas");
const {
  authenticateUser,
  authorizePermissions,
  dataValidator,
} = require("../../middlewares");

const router = require("express").Router();

router
  .route("/")
  .post(
    [
      authenticateUser,
      authorizePermissions(1),
      dataValidator(accountSchemas.createAccount),
    ],
    accountControllers.registerAccount
  )
  .get(
    [authenticateUser, authorizePermissions(1)],
    accountControllers.getAllAccounts
  );

router
  .route("/me")
  .get(authenticateUser, accountControllers.showCurrentUserAccounts);

router
  .route("/:id")
  .post(
    [authenticateUser, dataValidator(accountSchemas.transferToAccount)],
    accountControllers.transferToAccount
  )
  .get(authenticateUser, accountControllers.getAccountById)
  .put(
    [
      authenticateUser,
      authorizePermissions(1),
      dataValidator(accountSchemas.createAccount),
    ],
    accountControllers.getAccountAndUpdate
  )
  .delete(
    [authenticateUser, authorizePermissions(1)],
    accountControllers.deleteAccountById
  );

module.exports = router;
