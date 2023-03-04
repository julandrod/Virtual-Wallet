const transactionControllers = require("./transactions.controllers");
const { authenticateUser, dataValidator } = require("../../middlewares");
const transactionSchemas = require("./transactions.schemas");

const router = require("express").Router();

router
  .route("/")
  .post(
    [authenticateUser, dataValidator(transactionSchemas.createTransaction)],
    transactionControllers.registerTransaction
  )
  .get(authenticateUser, transactionControllers.listMyTransactions);

router
  .route("/:id")
  .get(authenticateUser, transactionControllers.getTransactionById)
  .put(
    [authenticateUser, dataValidator(transactionSchemas.updateTransaction)],
    transactionControllers.updateTransactionById
  )
  .delete(authenticateUser, transactionControllers.deleteTransactionById);

module.exports = router;
