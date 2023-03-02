const validateLogin = {
  email: {
    exists: { bail: true, errorMessage: "Debe ingresar un email" },
    trim: true,
    isEmail: {
      errorMessage: "Debe ingresar un email valido",
    },
  },
  password: {
    exists: { bail: true, errorMessage: "Debe ingresar un password" },
    trim: true,
    isLength: {
      errorMessage: "Password debe tener entre 4 y 15 caracteres",
      options: { min: 4, max: 15 },
    },
  },
};

module.exports = validateLogin;
