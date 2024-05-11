const Reservation = require("../models/reservation");

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.getAllReservations();
    res.json(reservations);
  } catch (error) {
    console.error("Error getting reservations:", error);
    res.status(500).send("Server Error");
  }
};

const createReservaion = async (req, res) => {
  try {
    const newReservation = await Reservation.createReservation(req.body);
    res.status(201).json(newReservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).send("Server Error");
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
    res.status(500).send("Server Error");
  }
};

module.exports = { getAllReservations, createReservaion, getReservationById };
