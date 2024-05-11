const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizeUser,
} = require("../middleware/authMiddleware");

// Route protected by authentication middleware
router.get("/protected", authenticateUser, (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

// Route protected by both authentication and authorization middleware
router.get("/admin", authenticateUser, authorizeUser, (req, res) => {
  res.json({ message: "Admin route accessed successfully", user: req.user });
});

module.exports = router;
