const jwt = require('jsonwebtoken');
const { USER_ROLES, ERROR_MESSAGES, STATUS_CODES, JWT_SECRET } = require('../utils/constants');
const { verifyJWTToken } = require('../utils/helpers');

// Authentication middleware to verify the user's JWT token
exports.authenticateUser = async (req, res, next) => {
    try {
        // Extract token from the request header (usually 'Authorization: Bearer <token>')
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
        }

        const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'
        const decodedToken = verifyJWTToken(token); // Verify and decode the token from helper Method

        // Attach the decoded token to the request object so we can access it in the controller
        req.user = decodedToken;

        next(); // Proceed to the next middleware or controller
    } catch (err) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: ERROR_MESSAGES.INVALID_CREDENTIALS });
    }
};

// Middleware to restrict access based on user roles (e.g., Admin, Artist)
exports.authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Access the user's role from the JWT token
        if (!allowedRoles.includes(userRole)) {
            return res.status(STATUS_CODES.FORBIDDEN).json({ message: ERROR_MESSAGES.ACCESS_DENIED });
        }
        next(); // Continue if the user role is authorized
    };
};
