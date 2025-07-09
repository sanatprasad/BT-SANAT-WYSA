# Project Documentation

## Table of Contents
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Models](#models)
- [Controllers](#controllers)
- [Routes & Endpoints](#routes--endpoints)
- [Middlewares](#middlewares)
- [API Documentation](#api-documentation)
- [Utilities](#utilities)

---

## Project Overview
This backend project is built with Node.js, Express, and MongoDB. It provides RESTful APIs for user management and sleep assessment, with JWT-based authentication, rate limiting, and email notifications. The API is documented using Swagger (OpenAPI 3.0).

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

## Configuration
- **MongoDB**: Connection is established in `config/mongo.js` using the `MONGO_URL` environment variable.
- **Email**: Nodemailer is configured in `config/emailconfig.js` using environment variables for host, port, user, and password.
- **Environment Variables**: Store sensitive data such as database URI, JWT secret, and email credentials in a `.env` file.

## Models

Mongoose models define the structure and validation for documents stored in MongoDB collections. They are used throughout the application to interact with the database, enforce data integrity, and provide schema-based validation.

### User Model (`models/user.js`)
The User model represents registered users in the system. It includes authentication, profile, and metadata fields.

| Field         | Type    | Required | Validation/Notes                                                                 |
|--------------|---------|----------|---------------------------------------------------------------------------------|
| name         | String  | Yes      | Must be provided                                                                |
| email        | String  | Yes      | Must be unique, valid email format                                              |
| password     | String  | Yes      | Min 8 chars, must contain at least one letter and one number                    |
| accountType  | Number  | No       | Optional, can be used for user roles or access levels                           |
| profile      | String  | No       | Optional, stores filename of uploaded profile image                             |
| dateCreated  | Number  | No       | Epoch time (seconds), set automatically on creation                             |

- **Validation:**
  - Email is validated with a regex for standard email format.
  - Password must be at least 8 characters and contain both letters and numbers.
  - Unique constraint on email ensures no duplicate registrations.

### SleepEntry Model (`models/SleepEntry.js`)
The SleepEntry model stores sleep assessment data for users.

| Field            | Type      | Required | Validation/Notes                                      |
|------------------|-----------|----------|------------------------------------------------------|
| userId           | ObjectId  | Yes      | References a User document                            |
| struggleDuration | String    | Yes      | Duration of sleep struggle (e.g., '30 minutes')       |
| sleepTime        | String    | Yes      | Time user went to sleep (e.g., '22:30')               |
| wakeTime         | String    | Yes      | Time user woke up (e.g., '06:30')                     |
| hoursOfSleep     | Number    | Yes      | Total hours slept                                     |
| createdAt        | Date      | No       | Automatically set to current date/time on creation    |

- **Validation:**
  - All fields except `createdAt` are required for each entry.
  - `userId` links each sleep entry to a specific user.

**Usage:**
- Models are imported in controllers to perform CRUD operations, validation, and queries against the MongoDB database.
- They ensure that only valid, well-structured data is stored and retrieved throughout the application.

## Controllers
### User Controller (`controllers/userController.js`)
- **registerController**: Handles user registration, password hashing, and profile image upload.
- **loginController**: Authenticates user, issues JWT, and updates user token.
- **getcontroller**: Fetches user by ID.
- **deletecontroller**: Deletes user by name.
- **updatecontroller**: Updates user by ID.
- **resetController**: Sends password reset link via email.
- **changepassword**: Changes user password after reset.
- **userPasswordReset**: Handles password reset using token.
- **getAllUsers**: Returns all users.
- **getImageController**: Returns user profile image in base64.

### Sleep Controller (`controllers/sleepController.js`)
- **addSleepEntry**: Adds a new sleep entry for the user.
- **getSleepHistory**: Returns all sleep entries for the current user.


## Routes & Endpoints
### User Routes (`routes/userRoutes.js`)
- `POST /api/v1/user/register` - Register a new user (with image upload)
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/:id` - Get user by ID
- `PUT /api/v1/user/:id` - Update user by ID
- `DELETE /api/v1/user/:name` - Delete user by name
- `GET /api/v1/user/imageinb64/:id` - Get user profile image in base64
- `POST /api/v1/user/reset-password` - Request password reset
- `POST /api/v1/user/changepassword` - Change password
- `POST /api/v1/user/password-updation/:id/:token` - Reset password with token
- `GET /api/v1/user/` - Get all users

### Sleep Routes (`routes/sleepRoutes.js`)
- `POST /api/sleep/submit` - Add sleep entry (JWT required)
- `GET /api/sleep/history` - Get sleep history (JWT required)


## Middlewares
### JWT Verification (`middlewares/verifyJWT.js`)
- Protects routes by verifying JWT in the `Authorization` header. Attaches decoded user info to `req.user`.

### Input Validation (`middlewares/validation.js`)
- Validates user registration input for required fields, email format, and password strength.

### Epoch Time Utility (`middlewares/epochTime.js`)
- Provides functions to get current epoch time and epoch time 7 days ahead.

## API Documentation
- **Swagger UI** is available at `/api-docs` (see `docs/swaggerOptions.js`).
- All endpoints, request/response schemas, and security schemes are defined in `docs/paths.js` and `docs/components.js`.

## Utilities
- **Rate Limiting**: Configured in `server.js` using `express-rate-limit` to prevent abuse.
- **CORS**: Configured in `server.js` to allow cross-origin requests.
- **Multer**: Used for handling file uploads (profile images) in user registration.


