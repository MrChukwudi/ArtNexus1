const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, SESSION_TIMEOUT } = require('./constants');

// Helper functions for different operations

// Function to hash a password (async)
exports.hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Function to verify a password
exports.verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

// Function to generate a JWT token for a user
exports.generateJWTToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role }, // Payload: user ID and role
        JWT_SECRET, // Secret key from constants
        { expiresIn: SESSION_TIMEOUT / 1000 } // Token expiration (in seconds)
    );
};

// Function to verify JWT token
exports.verifyJWTToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

// Utility to format dates into a readable format (dd-mm-yyyy)
exports.formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

// Function to check if a user has the required role (middleware helper)
exports.isAuthorizedRole = (user, allowedRoles) => {
    return allowedRoles.includes(user.role);
};

// Function to convert an amount to currency format (USD)
exports.formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Function to sanitize inputs to prevent SQL injection/XSS attacks
exports.sanitizeInput = (input) => {
    return input.replace(/[^a-zA-Z0-9 ]/g, ''); // Replace any unwanted characters
};
