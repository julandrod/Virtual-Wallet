const { login, showCurrentUser } = require("../controllers/auth.controllers");
const { authenticateUser, dataValidator } = require("../middlewares");
const { validateLogin } = require("../validators");

const router = require("express").Router();

router.post("/login", dataValidator(validateLogin), login);
router.get("/me", authenticateUser, showCurrentUser);

module.exports = router;
