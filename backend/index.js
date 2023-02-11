import express from "express";
import dotenv from "dotenv";
import startDb from "./db/index.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

// Routes
app.get("/", (req, res) => {
  res.send("Virtual Wallet");
});

const startApi = () => {
  startDb();
  app.listen(port, () => console.log(`Server is listening on port ${port}`));
};

startApi();
