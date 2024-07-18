const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getMyInfo,
} = require("../controllers/userController");
const { authenticateUser } = require("../middleware/authMiddleware");
const { authorizeUser } = require("../middleware/authorizeMiddleware");

// Route to get all users
router.get("/", authenticateUser, authorizeUser, getAllUsers);

router.get("/me", authenticateUser, getMyInfo);

// Route to get user by ID
router.get("/:userId", authenticateUser, authorizeUser, getUserById);

module.exports = router;
