const validateCreateTransaction = {
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
  concept: {
    exists: { bail: true, errorMessage: "Debe ingresar un concepto" },
    trim: true,
    isLength: {
      errorMessage: "Concepto debe tener entre 2 y 50 caracteres",
      options: { min: 2, max: 50 },
    },
  },
  //   TODO: corregir validacion type solo valida el primer item en las opciones
  //   type: {
  //     exists: {
  //       bail: true,
  //       errorMessage: "Debe ingresar el tipo de transaccion",
  //     },
  //     trim: true,
  //     isIn: {
  //       options: ["topup", "payment"],
  //       errorMessage: "Tipo de transaccion deber ser 'topup' o 'payment'",
  //     },
  //   },
  accountId: {
    exists: { bail: true, errorMessage: "Debe ingresar el id de la cuenta" },
    trim: true,
    isUUID: {
      errorMessage: "El Id debe tener formato UUID",
    },
  },
  to_account_id: {
    exists: {
      bail: true,
      errorMessage: "Debe ingresar el id de la cuenta destino",
    },
    trim: true,
    isUUID: {
      errorMessage: "El Id debe tener formato UUID",
    },
  },
};

module.exports = validateCreateTransaction;
