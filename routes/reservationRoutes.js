const express = require("express");
const router = express.Router();
const {
  getAllReservations,
  createReservaion,
  getReservationById,
} = require("../controllers/reservationController");

// Route to get all reservations
router.get("/", getAllReservations);

// Route to create a new reservation
router.post("/", createReservaion);

// Route to get reservation by ID
router.get("/:reservationId", getReservationById);

module.exports = router;
