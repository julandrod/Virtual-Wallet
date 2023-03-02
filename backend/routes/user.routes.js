const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  resetPassword,
  blockAccount,
} = require("../controllers/user.controllers");
const {
  dataValidator,
  authorizePermissions,
  authenticateUser,
} = require("../middlewares");
const {
  validateRegisterUser,
  validateUpdateUser,
  validateResetPassword,
} = require("../validators");

const router = require("express").Router();

router
  .route("/")
  .post(dataValidator(validateRegisterUser), registerUser)
  .get(authenticateUser, getAllUsers);

router
  .route("/:id")
  .get(authenticateUser, getUserById)
  .put([authenticateUser, dataValidator(validateUpdateUser)], updateUserById)
  .delete(authenticateUser, deleteUserById);

router
  .route("/resetPassword/:userId")
  .patch(
    [authenticateUser, dataValidator(validateResetPassword)],
    resetPassword
  );

  router.route("/block/:accountId").patch([authenticateUser], blockAccount)
  router.route("/unblock/:accountId").patch([authenticateUser], blockAccount)

module.exports = router;
