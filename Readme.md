# BookMyWheel Backend

## Overview
BookMyWheel is a vehicle booking platform that allows users to rent vehicles seamlessly. This backend provides RESTful APIs to handle user authentication, vehicle listings, bookings, and payments.

## Features
- User Authentication (JWT-based login/signup)
- Vehicle Management (Add, update, delete, and view vehicles)
- Booking System (Vehicle reservations and management)
- Payment Integration (Stripe/Razorpay support)
- Admin Dashboard (Manage users and bookings)
- Review & Rating System

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Token), bcrypt for password hashing
- **Storage:** Cloudinary/AWS S3 for image uploads
- **Payments:** Stripe/Razorpay
- **Others:** Multer (File Uploads), Nodemailer (Email Notifications)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/bookmywheel-backend.git
   cd bookmywheel-backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and configure the required environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Vehicle Routes
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Add a new vehicle (Admin only)
- `PUT /api/vehicles/:id` - Update vehicle details (Admin only)
- `DELETE /api/vehicles/:id` - Delete a vehicle (Admin only)

### Booking Routes
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings (Admin only)
- `GET /api/bookings/:id` - Get a specific booking

### Payment Routes
- `POST /api/payments` - Process payment

## Deployment
This backend can be deployed using platforms like **Heroku, Render, or AWS**. Ensure you set environment variables correctly before deploying.

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature-name`)
5. Create a pull request


