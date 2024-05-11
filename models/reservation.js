const pool = require("../config/db");

class Reservation {
  // Methods to interact with the 'reservations' table
  static async getAllReservations() {
    try {
      const { rows } = await pool.query("SELECT * FROM reservations");
      return rows;
    } catch (error) {
      console.error("Error fetching reservations:", error);
      throw error;
    }
  }

  static async createReservation(reservationData) {
    const { user_id, court_id, price, timeslot } = reservationData;
    try {
      const { rows } = await pool.query(
        "INSERT INTO reservations (user_id, court_id, price, timeslot) VALUES ($1, $2, $3, $4) RETURNING *",
        [user_id, court_id, price, timeslot]
      );
      return rows[0];
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
  }

  static async getReservationById(reservationId) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM reservations WHERE reservation_id = $1",
        [reservationId]
      );
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error("Error fetching reservation by ID:", error);
      throw error;
    }
  }
}

module.exports = Reservation;
