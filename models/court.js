const pool = require("../config/db");

class Court {
  // Methods to interact with the 'courts' table
  static async getAllCourts() {
    try {
      const { rows } = await pool.query("SELECT * FROM courts");
      return rows;
    } catch (error) {
      console.error("Error fetching courts:", error);
      throw error;
    }
  }

  static async createCourt(courtData) {
    const { court_type, with_coach, with_tools, court_address } = courtData;
    try {
      const { rows } = await pool.query(
        "INSERT INTO courts (court_type, with_coach, with_tools, court_address) VALUES ($1, $2, $3, $4) RETURNING *",
        [court_type, with_coach, with_tools, court_address]
      );
      return rows[0];
    } catch (error) {
      console.error("Error creating court:", error);
      throw error;
    }
  }

  static async getCourtById(courtId) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM courts WHERE court_id = $1",
        [courtId]
      );
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error("Error fetching court by ID:", error);
      throw error;
    }
  }
}

module.exports = Court;
