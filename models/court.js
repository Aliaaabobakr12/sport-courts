const pool = require("../config/db");

// Court model
class Court {
  // Methods to interact with the 'courts' table
  // Static method to get all courts
  static async getAllCourts(court_type, location) {
    try {
      // Call the query method in the pool object to select all courts from the cout's table in postgreSQL database
      const { rows } = await pool.query(
        `SELECT * FROM courts WHERE court_type = $1 AND court_address = $2`,
        [court_type, location]
      );
      // Return the rows from the database
      return rows;
    } catch (error) {
      console.error("Error fetching courts:", error);
      throw error;
    }
  }

  // Static method to create a new court
  static async createCourt(courtData) {
    // Destructure the courtData object to get the court_type, with_coach, with_tools, and court_address
    const { court_type, with_coach, with_tools, court_address, price } =
      courtData;
    try {
      // Call the query method in the pool object to insert a new court into the courts table in the postgreSQL database
      const { rows } = await pool.query(
        "INSERT INTO courts (court_type, with_coach, with_tools, court_address, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [court_type, with_coach, with_tools, court_address, price]
      );
      return rows[0];
    } catch (error) {
      console.error("Error creating court:", error);
      throw error;
    }
  }

  // Static method to get a court by ID
  static async getCourtById(courtId) {
    try {
      // Call the query method in the pool object to select a court by court_id from the courts table in the postgreSQL database
      const { rows } = await pool.query(
        "SELECT * FROM courts WHERE court_id = $1",
        [courtId]
      );
      // Check if the court is not found
      if (rows.length === 0) {
        return { message: "Court not found" };
      }
      return rows[0];
    } catch (error) {
      console.error("Error fetching court by ID:", error);
      throw error;
    }
  }
}

module.exports = Court;
