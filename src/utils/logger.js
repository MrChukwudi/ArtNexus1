const fs = require('fs');
const path = require('path');

// Log file location and format settings
const logFilePath = path.join(__dirname, '..', '..', 'logs', 'app.log');

// Utility function to log messages to console and file
const logToFile = (message) => {
    const timestamp = new Date().toISOString(); // Get current timestamp in ISO format
    const logMessage = `${timestamp} - ${message}\n`;

    // Append log message to log file
    fs.appendFileSync(logFilePath, logMessage, 'utf8');

    // Also log to the console
    console.log(logMessage);
};

// Utility function for logging error messages
exports.logError = (error) => {
    logToFile(`ERROR: ${error}`);
};

// Utility function for logging success messages
exports.logSuccess = (message) => {
    logToFile(`SUCCESS: ${message}`);
};

// Utility function for logging warnings
exports.logWarning = (warning) => {
    logToFile(`WARNING: ${warning}`);
};

// Log middleware to log each incoming request
exports.logRequest = (req, res, next) => {
    const message = `Incoming request: ${req.method} ${req.originalUrl}`;
    logToFile(message);
    next(); // Continue to the next middleware
};

// Log middleware to log each response
exports.logResponse = (req, res, next) => {
    res.on('finish', () => {
        const message = `Response: ${req.method} ${req.originalUrl} - ${res.statusCode}`;
        logToFile(message);
    });
    next(); // Continue to the next middleware
};
