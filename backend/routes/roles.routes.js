const {
  registerRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
} = require("../controllers/role.controllers");
const {
  authenticateUser,
  dataValidator,
  authorizePermissions,
} = require("../middlewares");
const { validateRol } = require("../validators");

const router = require("express").Router();

router
  .route("/")
  .post(
    [authenticateUser, authorizePermissions(1), dataValidator(validateRol)],
    registerRole
  )
  .get([authenticateUser, authorizePermissions(1)], getAllRoles);

router
  .route("/:id")
  .get([authenticateUser, authorizePermissions(1)], getRoleById)
  .put(
    [authenticateUser, authorizePermissions(1), dataValidator(validateRol)],
    updateRoleById
  )
  .delete([authenticateUser, authorizePermissions(1)], deleteRoleById);

module.exports = router;
