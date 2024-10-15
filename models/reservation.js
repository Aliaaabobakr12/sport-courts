const pool = require("../config/db");

class Reservation {
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
    const {
      id,
      court_id,
      price,
      timeslot_start,
      timeslot_end,
      date_of_reservation,
      with_coach,
      with_tools,
    } = reservationData;
    try {
      const { rows: reserved_court } = await pool.query(
        "SELECT * FROM reservations WHERE id = $1 AND date_of_reservation = $2",
        [id, date_of_reservation]
      );

      const isCourtReserved = reserved_court.some(
        (court) =>
          timeslot_start === court.timeslot_start ||
          timeslot_end === court.timeslot_end ||
          date_of_reservation === court.date_of_reservation
      );

      if (isCourtReserved) {
        return { message: "Court is already reserved" };
      }

      const {
        rows: [newReservation],
      } = await pool.query(
        "INSERT INTO reservations (id, court_id, price, timeslot_start, timeslot_end, date_of_reservation, with_coach, with_tools) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [
          id,
          court_id,
          price,
          timeslot_start,
          timeslot_end,
          date_of_reservation,
          with_coach,
          with_tools,
        ]
      );

      return this.getReservationDetails(newReservation);
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
  }

  static async getReservationById(reservationId) {
    try {
      const {
        rows: [reservation],
      } = await pool.query("SELECT * FROM reservations WHERE id = $1", [
        reservationId,
      ]);

      if (!reservation) {
        return null;
      }

      return this.getReservationDetails(reservation);
    } catch (error) {
      console.error("Error fetching reservation by ID:", error);
      throw error;
    }
  }

  static async getReservationByUserId(userId) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM reservations WHERE id = $1",
        [userId]
      );

      const reservations = await Promise.all(
        rows.map((row) => this.getReservationDetails(row))
      );
      return reservations;
    } catch (error) {
      console.error("Error fetching reservation by user ID:", error);
      throw error;
    }
  }

  static async deleteReservation(reservationId) {
    try {
      const {
        rows: [reservation],
      } = await pool.query("SELECT * FROM reservations WHERE id = $1", [
        reservationId,
      ]);

      if (!reservation) {
        return { message: "Reservation not found" };
      }

      const diffInHours = this.calculateHoursDifference(reservation.time_stamp);
      if (diffInHours <= 4) {
        await pool.query("DELETE FROM reservations WHERE id = $1", [
          reservationId,
        ]);
        return { message: "Reservation deleted successfully" };
      } else {
        return {
          message:
            "You can't cancel reservation after 4 hours of the reservation time",
        };
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
      throw error;
    }
  }

  static async getReservationDetails(reservation) {
    try {
      const {
        rows: [user],
      } = await pool.query("SELECT * FROM users WHERE id = $1", [
        reservation.id,
      ]);
      const {
        rows: [court],
      } = await pool.query("SELECT * FROM courts WHERE id = $1", [
        reservation.id,
      ]);

      if (!user || !court) {
        throw new Error("User or court not found");
      }

      return {
        id: reservation.id,
        user: {
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          address: user.address,
          phone_number: user.phone,
        },
        court: {
          type: court.type,
          address: court.address,
        },
        price: reservation.price,
        timeslot_start: reservation.timeslot_start,
        timeslot_end: reservation.timeslot_end,
        date_of_reservation: reservation.date_of_reservation,
        with_coach: reservation.with_coach,
        with_tools: reservation.with_tools,
        time_stamp: reservation.time_stamp,
      };
    } catch (error) {
      console.error("Error fetching reservation details:", error);
      throw error;
    }
  }

  static calculateHoursDifference(timeStamp) {
    const currentTime = new Date();
    const reservationTime = new Date(timeStamp);
    const diffInMilliseconds = Math.abs(
      currentTime.getTime() - reservationTime.getTime()
    );
    return diffInMilliseconds / (1000 * 60 * 60);
  }
}

module.exports = Reservation;
