const pool = require("../config/db");

// Reservation model
class Reservation {
  // Methods to interact with the 'reservations' table
  // Static method to get all reservations
  static async getAllReservations() {
    try {
      // Call the query method in the pool object to select all reservations from the reservations table in postgreSQL database
      const { rows } = await pool.query("SELECT * FROM reservations");
      return rows;
    } catch (error) {
      console.error("Error fetching reservations:", error);
      throw error;
    }
  }

  // Static method to create a new reservation
  static async createReservation(reservationData) {
    // Destructure the reservationData object to get the user_id, court_id, price, timeslot_start, and timeslot_end
    const { user_id, court_id, price, timeslot_start, timeslot_end } =
      reservationData;
    try {
      // Check if the court is already reserved
      const { rows: reserved_court } = await pool.query(
        "SELECT * FROM reservations WHERE court_id = $1",
        [court_id]
      );
      // Check if the court is already reserved
      let updatedReservation = {};
      let isCourtReserved = false;
      reserved_court.map((court) => {
        if (
          // check if the input timeslot_start is equal to any time_slot_start in the database and the same for timeslot_end
          // Which mean check if the user reserve in taken time
          timeslot_start === court.timeslot_start.substring(0, 5) ||
          timeslot_end === court.timeslot_end.substring(0, 5)
        ) {
          isCourtReserved = true;
          return;
        }
      });
      // If the court is already reserved, return a message
      if (isCourtReserved) {
        console.log("Court is already reserved");
        return { message: "Court is already reserved" };
      }

      // Call the query method in the pool object to insert a new reservation into the reservations table in the postgreSQL database
      const { rows } = await pool.query(
        "INSERT INTO reservations (user_id, court_id, price, timeslot_start, timeslot_end) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [user_id, court_id, price, timeslot_start, timeslot_end]
      );
      // Get the user and court details that realted to the reservation
      const { rows: user } = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [user_id]
      );
      const { rows: court } = await pool.query(
        "SELECT * FROM courts WHERE court_id = $1",
        [court_id]
      );
      // Create an object with the reservation details
      updatedReservation = {
        reservation_id: rows[0].reservation_id,
        user: {
          name: user[0].first_name + " " + user[0].last_name,
          email: user[0].email,
          address: user[0].address,
          phone_number: user[0].phone,
        },
        court: {
          court_type: court[0].court_type,
          with_coach: court[0].with_coach,
          with_tools: court[0].with_tools,
          court_address: court[0].court_address,
        },
        price: rows[0].price,
        timeslot_start: rows[0].timeslot_start,
        timeslot_end: rows[0].timeslot_end,
      };
      return updatedReservation;
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
  }

  // Static method to get a reservation by ID
  static async getReservationById(reservationId) {
    try {
      let updatedReservation = {};
      const { rows } = await pool.query(
        "SELECT * FROM reservations WHERE reservation_id = $1",
        [reservationId]
      );
      const { rows: user } = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [rows[0].user_id]
      );
      const { rows: court } = await pool.query(
        "SELECT * FROM courts WHERE court_id = $1",
        [rows[0].court_id]
      );
      updatedReservation = {
        reservation_id: rows[0].reservation_id,
        user: {
          name: user[0].first_name + " " + user[0].last_name,
          email: user[0].email,
          address: user[0].address,
          phone_number: user[0].phone,
        },
        court: {
          court_type: court[0].court_type,
          with_coach: court[0].with_coach,
          with_tools: court[0].with_tools,
          court_address: court[0].court_address,
        },
        price: rows[0].price,
        timeslot_start: rows[0].timeslot_start,
        timeslot_end: rows[0].timeslot_end,
      };
      return updatedReservation;
    } catch (error) {
      console.error("Error fetching reservation by ID:", error);
      throw error;
    }
  }

  // Static method to get a reservation by user ID, if the user wants to see all his reservations from his profile
  static async getReservationByUserId(userId) {
    try {
      let updatedReservation = [];
      const { rows } = await pool.query(
        "SELECT * FROM reservations WHERE user_id = $1",
        [userId]
      );

      // Create an array of promises to get the user and court details for each reservation
      const promises = rows.map(async (reservation) => {
        // Get the user and court details that realted to the reservation
        const { rows: userRows } = await pool.query(
          "SELECT * FROM users WHERE user_id = $1",
          [reservation.user_id]
        );
        const { rows: courtRows } = await pool.query(
          "SELECT * FROM courts WHERE court_id = $1",
          [reservation.court_id]
        );

        // Create an object with the reservation details
        updatedReservation.push({
          reservation_id: reservation.reservation_id,
          user: {
            name: userRows[0].first_name + " " + userRows[0].last_name,
            email: userRows[0].email,
            address: userRows[0].address,
            phone_number: userRows[0].phone,
          },
          court: {
            court_type: courtRows[0].court_type,
            with_coach: courtRows[0].with_coach,
            with_tools: courtRows[0].with_tools,
            court_address: courtRows[0].court_address,
          },
          price: reservation.price,
          timeslot_start: reservation.timeslot_start,
          timeslot_end: reservation.timeslot_end,
        });
      });

      // Wait for all promises to resolve
      await Promise.all(promises);

      return updatedReservation;
    } catch (error) {
      console.error("Error fetching reservation by user ID:", error);
      throw error;
    }
  }

  // Static method to calculate the difference in hours between the current time and the reservation time
  static calculateHoursDifference(timeStr) {
    // Get the current time
    const currentTime = new Date();

    // Calculate the difference in milliseconds
    const diffInMilliseconds = Math.abs(
      currentTime.getTime() - timeStr.getTime()
    );

    // Convert the difference to hours
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return diffInHours;
  }

  // Static method to delete a reservation by ID
  static async deleteReservation(reservationId, res) {
    try {
      const { rows: reservation } = await pool.query(
        "SELECT * FROM reservations WHERE reservation_id = $1",
        [reservationId]
      );

      //Call the calculateHoursDifference method to calculate the difference in hours between the current time and the reservation time
      const diffInHours = this.calculateHoursDifference(
        reservation[0].time_stamp
      );
      // Check if the difference in hours is greater than 4 hours, if so, the user can't cancel the reservation
      if (diffInHours > 4) {
        return res.status(400).json({
          message:
            "You can't cancel reservation after 4 hours of the reservation time",
        });
      }
      await pool.query(
        "DELETE FROM reservations WHERE reservation_id = $1 RETURNING *",
        [reservationId]
      );
      return res
        .status(200)
        .json({ message: "Reservation deleted successfully" });
    } catch (error) {
      console.error("Error deleting reservation:", error);
      throw error;
    }
  }
}

module.exports = Reservation;
