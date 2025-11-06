# Bike Rental Reservation System Backend

## Overview

This is the backend of the Bike Rental Reservation System. It provides RESTful API endpoints to manage users, bikes, and bookings. The system supports user authentication, authorization, and transaction management, ensuring secure and reliable operations.

## Features

- **User Authentication & Authorization:** Sign up, login, and role-based access control (admin and user).
- **Bike Management:** Admins can add, update, and delete bikes from the system.
- **Booking Management:** Users can rent bikes, and the system tracks bookings, costs, and returns.
- **Error Handling:** Comprehensive error handling for all operations.
- **Database Transactions:** Ensures consistency and rollback in case of failures during critical operations.

## Technology Stack

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building the RESTful API.
- **MongoDB**: NoSQL database for storing users, bikes, and bookings.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT**: JSON Web Tokens for user authentication.
- **bcrypt**: Library for hashing passwords.
- **Zod**: Schema validation library.

# API Endpoints

## User Routes

- **Sign Up:** `POST /api/auth/signup`  
  Register a new user.

- **Login:** `POST /api/auth/login`  
  Authenticate a user and return a token.

- **Get Profile:** `GET /api/users/me`  
  Retrieve the profile of the logged-in user.

- **Update Profile:** `PUT /api/users/me`  
  Update the profile of the logged-in user.

## Bike Routes

- **Create Bike (Admin Only):** `POST /api/bikes`  
  Add a new bike to the system. (Admin access required)

- **Get All Bikes:** `GET /api/bikes`  
  Retrieve a list of all bikes.

- **Update Bike (Admin Only):** `PUT /api/bikes/:id`  
  Update the details of a specific bike. (Admin access required)

- **Delete Bike (Admin Only):** `DELETE /api/bikes/:id`  
  Remove a bike from the system. (Admin access required)

## Rental Routes

- **Create Rental:** `POST /api/rentals`  
  Create a new rental entry.

- **Return Bike:** `PUT /api/rentals/:id/return`  
  Mark a bike as returned.

- **Get All Rentals:** `GET /api/rentals`  
  Retrieve a list of all rentals.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bike-rental-reservation-system.git
   cd bike-rental-reservation-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:5000/bike-rental
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```
