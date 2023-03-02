const {
  registerTransaction,
  listMyTransactions,
  getTransactionById,
  updateTransactionById,
  deleteTransactionById,
} = require("../controllers/transactions.controllers");
const { authenticateUser } = require("../middlewares/auth.middleware");
const dataValidator = require("../middlewares/validator.middleware");
const { validateCreateTransaction } = require("../validators");
const validateUpdateTransaction = require("../validators/validateUpdateTransaction.schema");

const router = require("express").Router();

router
  .route("/")
  .post(
    [authenticateUser, dataValidator(validateCreateTransaction)],
    registerTransaction
  )
  .get(authenticateUser, listMyTransactions);

router
  .route("/:id")
  .get(authenticateUser, getTransactionById)
  .put([authenticateUser, dataValidator(validateUpdateTransaction)], updateTransactionById)
  .delete(authenticateUser, deleteTransactionById);

module.exports = router;
