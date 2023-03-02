const validateUpdateUser = {
  firstName: {
    exists: { bail: true, errorMessage: "Debe ingresar un nombre" },
    trim: true,
    isLength: {
      errorMessage: "Nombre debe tener entre 3 y 10 caracteres",
      options: { min: 3, max: 10 },
    },
  },
  lastName: {
    exists: { bail: true, errorMessage: "Debe ingresar un apellido" },
    trim: true,
    isLength: {
      errorMessage: "Apellido debe tener entre 3 y 10 caracteres",
      options: { min: 3, max: 10 },
    },
  },
  email: {
    exists: { bail: true, errorMessage: "Debe ingresar un email" },
    trim: true,
    isEmail: {
      errorMessage: "Debe ingresar un email valido",
    },
  },
  image: {
    optional: {
      nulleable: true,
    },
    isURL: {
      errorMessage: "URL no valida",
    },
  },
};

module.exports = validateUpdateUser;
