const { ErrorObject, comparePassword, createJwt } = require("../../helpers");
const { User, Role } = require("../../database/models");

const loginUser = async (email, password) => {
  try {
    const userFound = await User.findOne({ where: { email } });
    if (!userFound) {
      throw new ErrorObject(
        "No se encontro ningun usuario registrado con este email",
        401
      );
    }

    const passwordMatch = await comparePassword(password, userFound.password);
    if (!passwordMatch) {
      throw new ErrorObject("Datos de acceso invalidos", 401);
    }

    const { password: pass, ...userInfo } = userFound.dataValues;
    const token = createJwt({ payload: userInfo });
    return token;
  } catch (error) {
    throw new ErrorObject(error);
  }
};

const findActiveUser = async (id) => {
  try {
    return await User.findOne({ where: { id }, include: [Role] });
  } catch (error) {
    throw new ErrorObject(error);
  }
};

module.exports = { loginUser, findActiveUser };
