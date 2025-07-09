# WYSA Backend API

## Overview
This project is a backend API built with Node.js, Express, and MongoDB. It provides endpoints for user management and sleep assessment, and is designed to be scalable and secure. The API is documented using Swagger (OpenAPI 3.0).

## Review & Evaluation
Please go through the doumentation.md file . Also Swagger has been used for interactive API documentation.

## Features
- User registration and authentication
- Sleep entry management
- JWT-based authentication and route protection
- Rate limiting and CORS support
- Email notifications
- Comprehensive API documentation with Swagger

## Tech Stack
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- Nodemailer for email
- Swagger for API docs

## Getting Started

### Prerequisites
- Node.js (v20.x recommended)
- MongoDB instance (local or cloud)
- Git

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd BT-INTERNSHIP-1-WYSA
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your MongoDB URI, JWT secret, email credentials, and other required variables.

### Running the Server
Start the development server with nodemon:
```sh
npm start
```
The server will run on `http://localhost:8080` by default.

## API Documentation
Interactive API docs are available at:
```
http://localhost:8080/api-docs
```
The documentation is powered by Swagger (OpenAPI 3.0).

## Project Structure
```
BT-INTERNSHIP-1-WYSA/
├── config/           # Database and email configuration
├── controllers/      # Route handler logic (user, sleep)
├── docs/             # Swagger API documentation setup
├── middlewares/      # Custom Express middlewares (auth, validation, etc.)
├── models/           # Mongoose models (User, SleepEntry)
├── routes/           # Express route definitions
├── server.js         # Main server entry point
├── package.json      # Project metadata and dependencies
```

## Main Endpoints
- `/api/v1/user` - User-related operations (register, login, etc.)
- `/api/v1/sleep` - Sleep entry operations

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the ISC License. 
