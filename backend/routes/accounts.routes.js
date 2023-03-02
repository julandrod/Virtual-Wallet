const {
  registerAccount,
  getAllAccounts,
  showCurrentUserAccounts,
  transferToAccount,
  getAccountById,
  getAccountAndUpdate,
  deleteAccountById,
} = require("../controllers/accounts.controllers");
const {
  authenticateUser,
  authorizePermissions,
  dataValidator,
} = require("../middlewares");
const {
  validateCreateAccount,
  validateTransferToAccount,
} = require("../validators");

const router = require("express").Router();

router
  .route("/")
  .post(
    [
      authenticateUser,
      authorizePermissions(1),
      dataValidator(validateCreateAccount),
    ],
    registerAccount
  )
  .get([authenticateUser, authorizePermissions(1)], getAllAccounts);

router.route("/me").get(authenticateUser, showCurrentUserAccounts);

router
  .route("/:id")
  .post(
    [authenticateUser, dataValidator(validateTransferToAccount)],
    transferToAccount
  )
  .get(authenticateUser, getAccountById)
  .put(
    [
      authenticateUser,
      authorizePermissions(1),
      dataValidator(validateCreateAccount),
    ],
    getAccountAndUpdate
  )
  .delete([authenticateUser, authorizePermissions(1)], deleteAccountById);

module.exports = router;
