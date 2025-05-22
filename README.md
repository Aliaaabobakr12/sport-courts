# Sport Courts Reservation System

A full-stack application for managing sports facility reservations, allowing users to browse courts, make reservations, and administrators to manage the system.

## Overview

This application provides a platform for sports enthusiasts to find and book courts for various sports activities. Users can search for courts by type and location, view availability, and make reservations with optional add-ons like coaching or equipment.

## Features

### User Features

- **Court Search**: Filter courts by type (tennis, basketball, etc.) and location
- **Reservation System**: Book courts for specific time slots
- **Add-on Options**: Request coaching services or sports equipment with reservations
- **User Profiles**: View and manage personal information
- **Reservation Management**: View, modify, or cancel reservations

### Admin Features

- **Court Management**: Add, edit, or remove courts from the system
- **User Management**: View and manage user accounts
- **Reservation Overview**: Monitor all reservations in the system

## Technology Stack

### Backend

- **Node.js** with **Express.js** framework
- **PostgreSQL** database
- **JWT** for authentication
- **Bcrypt** for password hashing

### API Endpoints

#### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

#### Users

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/me` - Get current user's information
- `GET /api/users/:userId` - Get user by ID (admin only)

#### Courts

- `GET /api/courts` - Get all courts (filter by type and government)
- `POST /api/courts` - Add a new court (admin only)
- `GET /api/courts/:courtId` - Get court details by ID

#### Reservations

- `GET /api/reservations` - Get all reservations (admin only)
- `POST /api/reservations` - Create a new reservation
- `GET /api/reservations/:reservationId` - Get reservation details
- `DELETE /api/reservations/:reservationId` - Cancel a reservation
- `GET /api/reservations/user/:userId` - Get reservations by user ID
- `GET /api/reservations/court/:courtId/date/:date` - Get reservations for a court on a specific date

## Database Structure

### Tables

- **users**: Store user information and credentials
- **courts**: Store court details including type, location, and pricing
- **reservations**: Store booking information connecting users and courts

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

### Installation Steps

1. **Clone the repository**
2. **Install dependencies**
3. **Configure environment variables**
   Create a `.env` file with the following variables:

```
4. **Set up the database**
- Create a PostgreSQL database named `sport_courts`
- The tables will be created automatically when you start the application

5. **Start the application**

The server will start on port 3000 by default.

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header for protected routes:

## Development Notes

- When testing with tools like Postman, remember to set the appropriate Content-Type header for POST requests
- For file uploads (court images), use multipart/form-data encoding

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors

- [Your Name](https://github.com/yourusername)

## Future Enhancements

- Payment integration
- Email notifications for reservations
- Mobile application
- Rating system for courts
```