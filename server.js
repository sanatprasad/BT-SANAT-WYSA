const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/mongo');
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerUi = require("swagger-ui-express");
const specs = require("./docs/swaggerOptions"); // Swagger config

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

// Create Express app
const app = express();

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS Configuration
app.use(cors({
  origin: '*', // Allow all for development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ✅ Swagger UI Setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// ✅ Routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/sleep", require("./routes/sleepRoutes"));


// ✅ Listen
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
