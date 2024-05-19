const User = require("../models/user");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    // Call the static method in the User model
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).send("Server Error");
  }
};

// Get a user by id
const getUserById = async (req, res) => {
  // Extract the user id from the request parameters
  const userId = req.params.userId;
  try {
    // Call the static method in the User model
    const user = await User.getUserById(userId);
    // If the user is not found, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getUserById, getAllUsers };
