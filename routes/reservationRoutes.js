const express = require("express");
const router = express.Router();
const {
  getAllReservations,
  createReservaion,
  getReservationById,
  deleteReservation,
  getReservationByUserId,
} = require("../controllers/reservationController");
const { authenticateUser } = require("../middleware/authMiddleware");
const { authorizeUser } = require("../middleware/authorizeMiddleware");

// Route to get all reservations
router.get("/", authenticateUser, authorizeUser, getAllReservations);

// Route to create a new reservation
router.post("/", authenticateUser, createReservaion);

// Route to get reservation by ID
router.get("/:reservationId", authenticateUser, getReservationById);

// Route to delete reservation by ID
router.delete("/:reservationId", authenticateUser, deleteReservation);

// Route to get reservation by user ID
router.get("/user/:userId", authenticateUser, getReservationByUserId);

module.exports = router;
