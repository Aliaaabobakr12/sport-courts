const Court = require("../models/court");

const getAllCourts = async (req, res) => {
  try {
    const courts = await Court.getAllCourts();
    res.json(courts);
  } catch (error) {
    console.error("Error getting courts:", error);
    res.status(500).send("Server Error");
  }
};

const createCourt = async (req, res) => {
  try {
    const newCourt = await Court.createCourt(req.body);
    res.status(201).json(newCourt);
  } catch (error) {
    console.error("Error creating court:", error);
    res.status(500).send("Server Error");
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