const validateResetPassword = {
  oldPassword: {
    exists: { bail: true, errorMessage: "Debe ingresar el password anterior" },
    trim: true,
    isLength: {
      errorMessage: "Password debe tener entre 4 y 15 caracteres",
      options: { min: 4, max: 15 },
    },
  },
  newPassword: {
    exists: { bail: true, errorMessage: "Debe ingresar un nuevo password" },
    trim: true,
    isLength: {
      errorMessage: "Password debe tener entre 4 y 15 caracteres",
      options: { min: 4, max: 15 },
    },
  },
};

module.exports = validateResetPassword;
