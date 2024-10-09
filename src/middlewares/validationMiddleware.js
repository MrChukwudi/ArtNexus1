const { validationResult } = require('express-validator');
const { STATUS_CODES, ERROR_MESSAGES } = require('../utils/constants');

// Middleware for validating request bodies using express-validator
exports.validateRequest = (req, res, next) => {
    const errors = validationResult(req); // Check for validation errors in the request

    // If there are validation errors, return them in the response
    if (!errors.isEmpty()) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: ERROR_MESSAGES.BAD_REQUEST,
            errors: errors.array() // Return an array of validation errors
        });
    }

    next(); // Proceed to the next middleware/controller if validation is successful
};
