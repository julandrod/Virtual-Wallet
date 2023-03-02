const { catchAsync, endpointResponse } = require("../helpers");
const {
  createRole,
  listRoles,
  findRoleById,
  findAndUpdateRole,
  findAndDeleteRole,
} = require("../services/role.services");

const registerRole = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;
  const role = await createRole(name, description);

  endpointResponse({
    res,
    code: 201,
    message: "Rol creado de manera exitosa",
    body: role,
  });
});

const getAllRoles = catchAsync(async (req, res, next) => {
  const roles = await listRoles();

  endpointResponse({
    res,
    message: "Roles listados de manera exitosa",
    body: roles,
  });
});

const getRoleById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const role = await findRoleById(id);

  endpointResponse({
    res,
    message: "Rol encontrado de manera exitosa",
    body: role,
  });
});

const updateRoleById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const role = await findRoleById(id);
  const response = await findAndUpdateRole(role, req.body);

  endpointResponse({
    res,
    message: "Rol actualizado de manera exitosa",
    body: response,
  });
});

const deleteRoleById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const role = await findRoleById(id);
  const response = await findAndDeleteRole(id, role);

  endpointResponse({
    res,
    message: response,
  });
});

module.exports = {
  registerRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
