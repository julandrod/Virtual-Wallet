require("dotenv").config();
const express = require("express");

// import database
const db = require("./models");

// import routes
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const roleRoutes = require("./routes/roles.routes");
const accountsRoutes = require("./routes/accounts.routes");
const transactionsRoutes = require("./routes/transactions.routes");

// Middlewares
const errorHandler = require("./middlewares/error.middleware");
const { ErrorObject } = require("./helpers");

// API config
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

// API routes
app.get("/", (req, res) => {
  res.send("Virtual Wallet");
});
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/accounts", accountsRoutes);
app.use("/api/v1/transactions", transactionsRoutes);

// Handle errors
app.use((req, res, next) => {
  next(new ErrorObject("No se encontro la ruta", 404));
});
app.use(errorHandler);

const startApi = async () => {
  console.log("Testing the database connection ...");
  try {
    await db.sequelize.authenticate();
    console.log("Database authentication successfully");
    await db.sequelize.sync({ alter: true, logging: false });
    console.log("Database synchronized");
    app.listen(port, () => console.log(`Server start on port ${port}`));
  } catch (error) {
    console.log("Unable to connect to the database ", error);
  }
};

startApi();
