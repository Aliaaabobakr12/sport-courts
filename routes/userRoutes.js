const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById } = require("../controllers/userController");

// Route to get all users
router.get("/", getAllUsers);

// Route to get user by ID
router.get("/:userId", getUserById);

module.exports = router;
