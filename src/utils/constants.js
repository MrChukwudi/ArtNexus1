// Constants file to store common values and enums used in the project

// User roles defined for the platform
exports.USER_ROLES = {
    ADMIN: 'Admin',
    ARTIST: 'Artist',
    REGISTERED_USER: 'Registered User',
    VISITOR: 'Visitor'
};

// Status codes used across the application
exports.STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
};

// Common error messages used throughout the app
exports.ERROR_MESSAGES = {
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid email or password',
    ACCESS_DENIED: 'Access denied',
    ART_NOT_FOUND: 'Art not found',
    COLLISION_ERROR: 'Request failed due to data conflict',
    INTERNAL_SERVER_ERROR: 'An internal error occurred'
};

// Session timeout (in milliseconds) for authentication purposes
exports.SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 1 day

// JWT secret key for session management (should match with env value)
exports.JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Currency for wallet/payment services
exports.CURRENCY = 'USD';

