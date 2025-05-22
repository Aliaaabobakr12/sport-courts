const express = require("express");
const router = express.Router();
const {
  getAllReservations,
  createReservation,
  getReservationById,
  deleteReservation,
  getReservationByUserId,
  getReservationByCourtId,
} = require("../controllers/reservationController");
const { authenticateUser } = require("../middleware/authMiddleware");
const { authorizeUser } = require("../middleware/authorizeMiddleware");

// Route to get all reservations
router.get("/", authenticateUser, authorizeUser, getAllReservations);

// Route to create a new reservation
router.post("/", authenticateUser, createReservation);

// Route to get reservation by ID
router.get("/:reservationId", authenticateUser, getReservationById);

// Route to delete reservation by ID
router.delete("/:reservationId", authenticateUser, deleteReservation);

// Route to get reservation by user ID
router.get("/user/:userId", authenticateUser, getReservationByUserId);

router.get("/court/:courtId/date/:date", getReservationByCourtId);

module.exports = router;
