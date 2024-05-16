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
    const { first_name, last_name, email, password, address, phone, is_admin } =
      userData;
    try {
      const { rows } = await pool.query(
        "INSERT INTO users (first_name, last_name, email, password, address, phone, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [first_name, last_name, email, password, address, phone, is_admin]
      );
      return rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (error) {
      console.error("Error fetching user by email:", error);
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
