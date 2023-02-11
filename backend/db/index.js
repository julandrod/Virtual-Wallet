import db from "./config.js";

const startDb = () => {
   db.authenticate()
    .then(() => console.log("Authentication successful"))
    .catch((error) => console.log(error));
  db.sync({ force: false })
    .then(() => console.log("Database synchronized"))
    .catch((error) => console.log(error));
};

export default startDb;
