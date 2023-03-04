const router = require("express").Router();
const userRoutes = require("./api/user/user.routes");
const authRoutes = require("./api/auth/auth.routes");
const roleRoutes = require("./api/role/roles.routes");
const accountsRoutes = require("./api/accounts/accounts.routes");
const transactionsRoutes = require("./api/transactions/transactions.routes");

const routerApi = (app) => {
  app.use(router);

  router.use("/api/v1/users", userRoutes);
  router.use("/api/v1/auth", authRoutes);
  router.use("/api/v1/roles", roleRoutes);
  router.use("/api/v1/accounts", accountsRoutes);
  router.use("/api/v1/transactions", transactionsRoutes);
};

module.exports = routerApi;
