const multer = require("multer");
const path = require("path");
const Court = require("../models/court");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const getAllCourts = async (req, res) => {
  try {
    const { type, government } = req.query;
    const courts = await Court.getAllCourts(type, government);
    res.json(courts);
  } catch (error) {
    console.error("Error getting courts:", error);
    res.status(500).send("Server Error");
  }
};

const createCourt = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Received file:", req.file);

    const { name, type, address, price, government } = req.body;
    const court_image = req.file ? req.file.path : null;

    console.log("Extracted court data:", {
      name,
      type,
      address,
      price,
      // court_image,
      government,
    });

    const newCourt = await Court.createCourt({
      name,
      type,
      address,
      price,
      // court_image,
      government,
    });

    res.status(201).json(newCourt);
  } catch (error) {
    console.error("Error creating court:", error);
    res.status(500).json({ error: error.message });
  }
};

const getCourtById = async (req, res) => {
  const courtId = req.params.courtId;
  try {
    const court = await Court.getCourtById(courtId);
    if (!court) {
      return res.status(404).json({ message: "Court not found" });
    }
    res.json(court);
  } catch (error) {
    console.error("Error getting court:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getAllCourts, createCourt, getCourtById };
