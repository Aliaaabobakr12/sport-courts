const express = require("express");
const router = express.Router();
const {
  getAllReservations,
  createReservaion,
  getReservationById,
} = require("../controllers/reservationController");
const { authenticateUser } = require("../middleware/authMiddleware");
const { authorizeUser } = require("../middleware/authorizeMiddleware");

// Route to get all reservations
router.get("/", authenticateUser, authorizeUser, getAllReservations);

// Route to create a new reservation
router.post("/", authenticateUser, createReservaion);

// Route to get reservation by ID
router.get("/:reservationId", authenticateUser, getReservationById);

module.exports = router;
