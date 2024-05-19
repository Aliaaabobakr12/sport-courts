const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

//Endpoint to register a new user
router.post("/register", register);

//Endpoint to login a user
router.post("/login", login);

module.exports = router;
