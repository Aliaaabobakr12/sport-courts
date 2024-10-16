const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user in the database and send a JWT (token)
const register = async (req, res) => {
  try {
    // Extract user data from request body
    const { first_name, last_name, email, password, address, phone, is_admin } =
      req.body;
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user in the database with the required data
    const newUser = await User.createUser({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      address,
      phone,
      is_admin: is_admin || false,
    });

    // Generate and send JWT if registration is successful
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    // Handle errors
    console.error("Error registering user:", error);
    res.status(500).send("Server Error");
  }
};

// login a user and send a JWT (token)
const login = async (req, res) => {
  try {
    // Extract user data from request body
    const { email, password } = req.body;
    // Check if the user exists in the database with the provided email
    const user = await User.getUserByEmail(email);
    // If the user does not exist, return an error
    if (!user) {
      return res.status(401).json({ message: "Wrong Email!" });
    }
    // Check if the provided password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong Password!" });
    }
    // Generate and send JWT if authentication is successful
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = { register, login };
