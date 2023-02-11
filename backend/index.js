import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

// Routes
app.get("/", (req, res) => {
  res.send("Virtual Wallet");
});

const startApi = () => {
  app.listen(port, () => console.log(`Server is listening on port ${port}`));
};

startApi();
