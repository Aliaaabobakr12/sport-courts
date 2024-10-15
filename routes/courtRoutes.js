const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getAllCourts,
  createCourt,
  getCourtById,
} = require("../controllers/courtController");
const { authorizeUser } = require("../middleware/authorizeMiddleware");
const { authenticateUser } = require("../middleware/authMiddleware");

// Use an absolute path for the uploads directory
const uploadsDir = path.join(__dirname, "..", "uploads");

// Ensure the uploads directory exists
const fs = require("fs");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// GET all courts
router.get("/", authenticateUser, getAllCourts);

// POST create a new court
router.post(
  "/",
  authenticateUser,
  authorizeUser,
  upload.single("court_image"),
  createCourt
);

// GET a specific court by ID
router.get("/:courtId", authenticateUser, getCourtById);

module.exports = router;
