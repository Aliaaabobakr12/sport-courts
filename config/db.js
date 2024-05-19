const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// Load environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Create tables in the database using SQL queries, we uncommented this code to create the tables in the database
// once the tables are created we can comment this code again

// async function createTables() {
//   try {
//     const usersTablePath = path.join(
//       __dirname,
//       "../migrations/001_create_users_table.sql"
//     );
//     const reservationsTablePath = path.join(
//       __dirname,
//       "../migrations/002_create_reservations_table.sql"
//     );
//     const courtsTablePath = path.join(
//       __dirname,
//       "../migrations/003_create_courts_table.sql"
//     );

//     const usersTableSql = fs.readFileSync(usersTablePath, "utf8");
//     const reservationsTableSql = fs.readFileSync(reservationsTablePath, "utf8");
//     const courtsTableSql = fs.readFileSync(courtsTablePath, "utf8");

//     await pool.query(usersTableSql);
//     await pool.query(reservationsTableSql);
//     await pool.query(courtsTableSql);

//     console.log("Tables created successfully");
//   } catch (error) {
//     console.error("Error creating tables:", error);
//   }
// }

// createTables().then(() => {
//   // After tables are created, you can close the pool
//   pool.end();
// });
module.exports = pool;
