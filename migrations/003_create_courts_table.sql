-- this file is used to create the courts table in the database

CREATE TABLE IF NOT EXISTS courts (
    court_id SERIAL PRIMARY KEY,
    court_type VARCHAR(50) NOT NULL,
    with_coach BOOLEAN NOT NULL,
    with_tools BOOLEAN NOT NULL,
    court_address VARCHAR(255) NOT NULL
);