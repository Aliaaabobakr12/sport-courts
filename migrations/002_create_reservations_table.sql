-- This migration creates the reservations table

CREATE TABLE IF NOT EXISTS reservations (
    reservation_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    court_id INT REFERENCES courts(court_id),
    price NUMERIC(10, 2) NOT NULL,
    timeslot_start TIME NOT NULL,
    timeslot_end TIME NOT NULL,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    date_of_reservation DATE NOT NULL,
    with_coach BOOLEAN NOT NULL,
    with_tools BOOLEAN NOT NULL
);