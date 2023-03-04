const { Op } = require("sequelize");
const {
  ErrorObject,
  encryptPassword,
  createJwt,
  checkPermissions,
  comparePassword,
} = require("../../helpers");
const { User, Role, Account } = require("../../database/models");

const createUser = async (userData) => {
  try {
    const { firstName, lastName, email, password, image } = userData;
    const hashPassword = await encryptPassword(password);

    const [response, created] = await User.findOrCreate({
      where: {
        email: userData.email,
      },
      defaults: {
        firstName,
        lastName,
        email,
        password: hashPassword,
        image,
        roleId: 2,
      },
    });
    delete response.dataValues.password;

    if (!created) {
      throw new ErrorObject("Este email ya esta registrado", 400);
    }

    // TODO: register user dont return a jwt token
    return createJwt({ payload: response.dataValues });
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const listUsers = async () => {
  try {
    const users = await User.findAndCountAll({
      attributes: { exclude: ["password"] },
      include: [Role],
    });
    return users;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
      include: [Role],
    });

    if (!user) {
      throw new ErrorObject("No se encontro ningun usuario con este id", 404);
    }

    return user;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const findAndUpdateById = async (user, newInfo, reqUser) => {
  try {
    const { firstName, lastName, email, image } = newInfo;
    checkPermissions(reqUser, user.dataValues.id);
    await user.update({ firstName, lastName, email, image });
    const token = createJwt({ payload: user.dataValues });

    return token;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const findAndDeleteById = async (id, user, reqUser) => {
  try {
    checkPermissions(reqUser, user.dataValues.id);
    await user.destroy();

    return `Usuario ${id} eliminado de manera exitosa`;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const findAndReplacePassword = async (
  reqUser,
  id,
  oldPassword,
  newPassword
) => {
  try {
    checkPermissions(reqUser, id);

    const user = await User.findOne({ where: { id } });

    const passwordMatch = await comparePassword(
      oldPassword,
      user.dataValues.password
    );
    if (!passwordMatch) {
      throw new ErrorObject("Password incorrecto", 403);
    }

    user.password = await encryptPassword(newPassword);
    await user.save();

    return "Password actualizado de manera exitosa";
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const findAccountAndBlock = async (accountId, reqUser, url) => {
  try {
    const account = await Account.findOne({
      where: {
        [Op.and]: [{ id: accountId }, { userId: reqUser.id }],
      },
    });

    if (!account) {
      throw new ErrorObject("No se encontro ninguna cuenta con ese Id", 404);
    }

    checkPermissions(reqUser, account.userId);

    account.isBlocked = url === "block" ? true : false;
    account.save();

    return account;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

module.exports = {
  createUser,
  listUsers,
  findUserById,
  findAndUpdateById,
  findAndDeleteById,
  findAndReplacePassword,
  findAccountAndBlock,
};
