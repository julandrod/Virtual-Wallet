const createAccount = {
  userId: {
    exists: { bail: true, errorMessage: "Debe ingresar el id del usuario" },
    trim: true,
    isUUID: {
      errorMessage: "El Id debe tener formato UUID",
    },
  },
  money: {
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
  isBlocked: {
    exists: {
      bail: true,
      errorMessage: "Debe el estado de la cuenta (bloqueada o desbloqueada)",
    },
    trim: true,
    isBoolean: {
      errorMessage:
        "Debe ingresar 'true' para bloquear la cuenta 'false' para desbloquearla",
    },
  },
};

const transferToAccount = {
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

module.exports = { createAccount, transferToAccount };
