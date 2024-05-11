const pool = require("../config/db");

class User {
  // Methods to interact with the 'users' table
  static async getAllUsers() {
    try {
      const { rows } = await pool.query("SELECT * FROM users");
      return rows;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async createUser(userData) {
    const { username, email, password, address, phone } = userData;
    try {
      const { rows } = await pool.query(
        "INSERT INTO users (username, email, password, address, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [username, email, password, address, phone]
      );
      return rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async getUserById(userId) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [userId]
      );
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }
}

module.exports = User;
