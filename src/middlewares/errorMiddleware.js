const { logError } = require('../utils/logger');
const { STATUS_CODES, ERROR_MESSAGES } = require('../utils/constants');

// Error-handling middleware for Express
const errorHandler = (err, req, res, next) => {
    // Log the error using our logger utility
    logError(err.message || 'Internal Server Error');

    // Send the appropriate error response
    res.status(err.status || STATUS_CODES.INTERNAL_ERROR).json({
        success: false,
        message: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // Stack trace shown only in development
    });
};

// Export the error handler for use in the app
module.exports = errorHandler;
