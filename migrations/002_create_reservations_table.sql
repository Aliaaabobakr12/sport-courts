CREATE TABLE IF NOT EXISTS reservations (
    reservation_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    court_id INT REFERENCES courts(court_id),
    price NUMERIC(10, 2) NOT NULL,
    timeslot TIMESTAMP NOT NULL
);