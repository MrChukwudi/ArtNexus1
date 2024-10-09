// Import required modules
const express = require('express'); // Framework for building web applications
const mongoose = require('mongoose'); // MongoDB object modeling tool
const session = require('express-session'); // Middleware for session management
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const logger = require('morgan'); // Logger middleware
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing
const errorMiddleware = require('./src/middlewares/errorMiddleware'); // Error handling middleware

require('dotenv').config(); // Loads environment variables

// Import Swagger modules
const swaggerUi = require('swagger-ui-express'); // Middleware to serve Swagger UI
const swaggerDocs = require('./src/config/swaggerOptions'); // Swagger options (your API documentation configuration)

// Import routes
const adminRoutes = require('./src/routes/adminRoutes');
const artistRoutes = require('./src/routes/artistRoutes');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const visitorRoutes = require('./src/routes/visitorRoutes');

// Create an instance of Express
const app = express();

// Load application configurations
const appConfig = require('./src/config/appConfig');

// Connect to the database
const dbConfig = require('./src/config/dbConfig');
dbConfig.connect(); // Call database connection function

// Serve Swagger UI on `/api-docs` route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 
// The `/api-docs` path will serve the Swagger UI, and `swaggerDocs` is the JSON documentation object

// Middleware setup
app.use(logger('dev')); // Logs requests to the console
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(cors()); // Enable CORS

app.use(session({
    secret: appConfig.sessionSecret, // Secret for session encryption
    resave: false, // Forces session to be saved back to the session store
    saveUninitialized: false, // Don't save uninitialized sessions
    cookie: { secure: appConfig.isProduction }, // Set secure cookie if in production
}));

// Use defined routes
app.use('/api/admin', adminRoutes);
app.use('/api/artist', artistRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/visitor', visitorRoutes);

// Error handling middleware
app.use(errorMiddleware); // Middleware to handle application-level errors

// Export the app for use in server.js
module.exports = app;
