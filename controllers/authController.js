const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, address, phone, is_admin } =
      req.body;
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      address,
      phone,
      is_admin,
    });

    const token = jwt.sign({ userId: newUser.user_id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Wrong Email!" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong Password!" });
    }
    // Generate and send JWT if authentication is successful
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = { register, login };
