const userControllers = require("./user.controllers");
const userSchemas = require("./user.schemas");
const { dataValidator, authenticateUser } = require("../../middlewares");

const router = require("express").Router();

router
  .route("/")
  .post(dataValidator(userSchemas.registerUser), userControllers.registerUser)
  .get(authenticateUser, userControllers.getAllUsers);

router
  .route("/:id")
  .get(authenticateUser, userControllers.getUserById)
  .put(
    [authenticateUser, dataValidator(userSchemas.updateUser)],
    userControllers.updateUserById
  )
  .delete(authenticateUser, userControllers.deleteUserById);

router
  .route("/resetPassword/:userId")
  .patch(
    [authenticateUser, dataValidator(userSchemas.resetPassword)],
    userControllers.resetPassword
  );

router
  .route("/block/:accountId")
  .patch(authenticateUser, userControllers.blockAccount);
  
router
  .route("/unblock/:accountId")
  .patch(authenticateUser, userControllers.blockAccount);

module.exports = router;
