require("dotenv").config();
require("express-async-errors");
const cors = require("cors");

// Express
const express = require("express");
const app = express();

const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const courtRoutes = require("./routes/courtRoutes");
const authRoutes = require("./routes/authRoutes");

// database
const pool = require("./config/db");

// Middelware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/courts", courtRoutes);
app.use("/api/auth", authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    pool
      .connect()
      .then(() => {
        console.log("Connected to PostgreSQL database");
      })
      .catch((err) => {
        console.error("Error connecting to PostgreSQL database", err);
      });
  } catch (error) {
    console.log(error);
  }
};

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Close the pool when the Node.js process terminates
process.on("SIGINT", () => {
  console.log("Closing database connection pool");
  pool.end();
  process.exit(0);
});

start();
