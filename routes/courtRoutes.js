// routes/courtRoutes.js
const express = require("express");
const router = express.Router();
// Import the court controller
const {
  getAllCourts,
  createCourt,
  getCourtById,
} = require("../controllers/courtController");
// Import the authorize middleware
const { authorizeUser } = require("../middleware/authorizeMiddleware");
const { authenticateUser } = require("../middleware/authMiddleware");

// Route to get all courts
router.get("/", authenticateUser, getAllCourts);

// Route to create a new court
router.post("/", authenticateUser, authorizeUser, createCourt);

// Route to get court by ID
router.get("/:courtId", authenticateUser, getCourtById);

module.exports = router;
