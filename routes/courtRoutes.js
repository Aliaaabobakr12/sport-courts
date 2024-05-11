// routes/courtRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllCourts,
  createCourt,
  getCourtById,
} = require("../controllers/courtController");

// Route to get all courts
router.get("/", getAllCourts);

// Route to create a new court
router.post("/", createCourt);

// Route to get court by ID
router.get("/:courtId", getCourtById);

module.exports = router;
