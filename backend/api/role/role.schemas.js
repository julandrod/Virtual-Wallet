const role = {
  name: {
    exists: { bail: true, errorMessage: "Debe ingresar un nombre para el rol" },
    trim: true,
    isLength: {
      errorMessage: "Nombre debe tener entre 2 y 20 caracteres",
      options: { min: 2, max: 20 },
    },
  },
  description: {
    exists: {
      bail: true,
      errorMessage: "Debe ingresar una descripcion para el rol",
    },
    trim: true,
    isLength: {
      errorMessage: "Descripcion debe tener entre 3 y 100 caracteres",
      options: { min: 3, max: 100 },
    },
  },
};

module.exports = {role};
