const { ErrorObject } = require("../helpers");
const { Role } = require("../models");

const createRole = async (name, description) => {
  try {
    const [response, created] = await Role.findOrCreate({
      where: { name },
      defaults: { name, description },
    });

    if (!created) {
      throw new ErrorObject("Este rol ya existe", 400);
    }
    return response;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const listRoles = async () => {
  try {
    const response = await Role.findAll();
    return response;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const findRoleById = async (id) => {
  try {
    const role = await Role.findOne({ where: { id } });
    if (!role) {
      throw new ErrorObject("No se encontro ningun rol con este id", 404);
    }

    return role;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const findAndUpdateRole = async (role, newInfo) => {
  try {
    const { name, description } = newInfo;
    return await role.update({ name, description });
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const findAndDeleteRole = async (id, role) => {
  try {
    await role.destroy();

    return `Rol ${id} eliminado de manera exitosa`;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

module.exports = {
  createRole,
  listRoles,
  findRoleById,
  findAndUpdateRole,
  findAndDeleteRole,
};
