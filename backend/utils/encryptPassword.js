import bcrypt from "bcrypt";

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, inputPassword) => {
  return await bcrypt.compare(password, inputPassword);
};

export { encryptPassword, comparePassword };
