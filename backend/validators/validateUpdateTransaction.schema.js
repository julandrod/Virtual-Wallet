const validateUpdateTransaction = {
  concept: {
    exists: { bail: true, errorMessage: "Debe ingresar un concepto" },
    trim: true,
    isLength: {
      errorMessage: "Concepto debe tener entre 2 y 50 caracteres",
      options: { min: 2, max: 50 },
    },
  },
};

module.exports = validateUpdateTransaction;
