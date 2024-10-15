const pool = require("../config/db");

class Court {
  static async getAllCourts(type, government) {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM courts WHERE type = $1 AND government = $2`,
        [type, government]
      );
      return rows;
    } catch (error) {
      console.error("Error fetching courts:", error);
      throw error;
    }
  }

  static async createCourt(courtData) {
    const { name, type, address, price, government } = courtData;

    if (!name) {
      throw new Error("Court name is required");
    }

    try {
      const { rows } = await pool.query(
        "INSERT INTO courts (name, type, address, price, government) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, type, address, price, government]
      );
      return rows[0];
    } catch (error) {
      console.error("Error creating court:", error);
      throw error;
    }
  }

  static async getCourtById(courtId) {
    try {
      const { rows } = await pool.query("SELECT * FROM courts WHERE id = $1", [
        courtId,
      ]);
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
