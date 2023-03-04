const roleControllers = require("./role.controllers")
const roleSchemas = require("./role.schemas")
const {
  authenticateUser,
  dataValidator,
  authorizePermissions,
} = require("../../middlewares");

const router = require("express").Router();

router
  .route("/")
  .post(
    [authenticateUser, authorizePermissions(1), dataValidator(roleSchemas.role)],
    roleControllers.registerRole
  )
  .get([authenticateUser, authorizePermissions(1)], roleControllers.getAllRoles);

router
  .route("/:id")
  .get([authenticateUser, authorizePermissions(1)], roleControllers.getRoleById)
  .put(
    [authenticateUser, authorizePermissions(1), dataValidator(roleSchemas.role)],
    roleControllers.updateRoleById
  )
  .delete([authenticateUser, authorizePermissions(1)], roleControllers.deleteRoleById);

module.exports = router;
