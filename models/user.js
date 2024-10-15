const pool = require("../config/db");

// User model
class User {
  // Methods to interact with the 'users' table
  static async getAllUsers() {
    // Call the query method in the pool object to select all users from the users table in postgreSQL database
    try {
      const { rows } = await pool.query("SELECT * FROM users");
      return rows;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  // Static method to create a new user
  static async createUser(userData) {
    // Destructure the userData object to get the first_name, last_name, email, password, address, phone, and is_admin
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

  // Static method to get a user by email
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

  // Static method to get a user by ID
  static async getUserById(userId) {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        userId,
      ]);
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
