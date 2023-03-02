const validateTransferToAccount = {
  accountId: {
    exists: { bail: true, errorMessage: "Debe ingresar el id de la cuenta" },
    trim: true,
    isUUID: {
      errorMessage: "El Id debe tener formato UUID",
    },
  },
  concept: {
    exists: { bail: true, errorMessage: "Debe ingresar un concepto" },
    trim: true,
    isLength: {
      errorMessage: "Concepto debe tener entre 2 y 50 caracteres",
      options: { min: 2, max: 50 },
    },
  },
  amount: {
    exists: {
      bail: true,
      errorMessage: "Debe ingresar una cantidad de dinero",
    },
    trim: true,
    isInt: {
      options: { gt: 0 },
      errorMessage: "Debe ingresar una cantidad de dinero mayor a 0",
    },
  },
};

module.exports = validateTransferToAccount;
