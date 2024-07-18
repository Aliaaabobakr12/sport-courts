const Court = require("../models/court");

// Get all courts
const getAllCourts = async (req, res) => {
  try {
    // Call the static method in the Court model
    const { court_type, location } = req.query;
    const courts = await Court.getAllCourts(court_type, location);
    res.json(courts);
  } catch (error) {
    console.error("Error getting courts:", error);
    res.status(500).send("Server Error");
  }
};

// Create a new court accessed only by admin
const createCourt = async (req, res) => {
  try {
    // Call the static method in the Court model
    const newCourt = await Court.createCourt(req.body);
    res.status(201).json(newCourt);
  } catch (error) {
    console.error("Error creating court:", error);
    res.status(500).send("Server Error");
  }
};

// Get a court by id
const getCourtById = async (req, res) => {
  // Extract the court id from the request parameters
  const courtId = req.params.courtId;
  try {
    // Call the static method in the Court model
    const court = await Court.getCourtById(courtId);
    // If the court is not found, return an error
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
