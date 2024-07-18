const Reservation = require("../models/reservation");

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.getAllReservations();
    res.json(reservations);
  } catch (error) {
    console.error("Error getting reservations:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createReservation = async (req, res) => {
  try {
    const result = await Reservation.createReservation(req.body);
    if (result.message === "Court is already reserved") {
      return res.status(400).json({ message: "Court is already reserved" });
    }
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getReservationById = async (req, res) => {
  const reservationId = req.params.reservationId;
  try {
    const reservation = await Reservation.getReservationById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    console.error("Error getting reservation:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getReservationByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const reservations = await Reservation.getReservationByUserId(userId);
    if (reservations.length === 0) {
      return res
        .status(404)
        .json({ message: "No reservations found for this user" });
    }
    res.json(reservations);
  } catch (error) {
    console.error("Error getting reservations:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteReservation = async (req, res) => {
  const reservationId = req.params.reservationId;
  try {
    const result = await Reservation.deleteReservation(reservationId);
    if (result.message === "Reservation not found") {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(result);
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllReservations,
  createReservation,
  getReservationById,
  deleteReservation,
  getReservationByUserId,
};
