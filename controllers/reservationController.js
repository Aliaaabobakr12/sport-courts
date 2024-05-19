const Reservation = require("../models/reservation");

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    // Call the static method in the Reservation model
    const reservations = await Reservation.getAllReservations();
    res.json(reservations);
  } catch (error) {
    console.error("Error getting reservations:", error);
    res.status(500).send("Server Error");
  }
};

// Create a new reservation
const createReservaion = async (req, res) => {
  try {
    // Call the static method in the Reservation model
    const newReservation = await Reservation.createReservation(req.body);
    res.status(201).json(newReservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).send("Server Error");
  }
};

// Get a reservation by id
const getReservationById = async (req, res) => {
  // Extract the reservation id from the request parameters
  const reservationId = req.params.reservationId;
  try {
    // Call the static method in the Reservation model
    const reservation = await Reservation.getReservationById(reservationId);
    // If the reservation is not found, return an error
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    console.error("Error getting reservation:", error);
    res.status(500).send("Server Error");
  }
};

// Get a reservation by user id
const getReservationByUserId = async (req, res) => {
  // Extract the user id from the request parameters
  const userId = req.params.userId;
  try {
    // Call the static method in the Reservation model
    const reservation = await Reservation.getReservationByUserId(userId);
    // If the reservation is not found, return an error
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    console.error("Error getting reservation:", error);
    res.status(500).send("Server Error");
  }
};

// Delete a reservation by id
const deleteReservation = async (req, res) => {
  // Extract the reservation id from the request parameters
  const reservationId = req.params.reservationId;
  const reservation = await Reservation.getReservationById(reservationId);
  try {
    // If the reservation is not found, return an error
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    // Call the static method in the Reservation model
    await Reservation.deleteReservation(reservationId, res);
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).send("Server Error");
  }
};

// Export the controller functions
module.exports = {
  getAllReservations,
  createReservaion,
  getReservationById,
  deleteReservation,
  getReservationByUserId,
};
