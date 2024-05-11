// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateUser = async (req, res, next) => {
  try {
    // Check if Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Extract token from Authorization header
    const token = authHeader.split(" ")[1];
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Check if user exists
    const user = await User.getUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Attach user object to request for further use
    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authenticateUser };