const { login, showCurrentUser } = require("./auth.controllers");
const { authenticateUser, dataValidator } = require("../../middlewares");
const loginSchema = require("./auth.schemas");

const router = require("express").Router();

router.post("/login", dataValidator(loginSchema), login);
router.get("/me", authenticateUser, showCurrentUser);

module.exports = router;
