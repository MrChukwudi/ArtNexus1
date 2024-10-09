// Configuration for the application

const appConfig = {
    appName: process.env.APP_NAME || 'ArtNexus',
    port: process.env.PORT || 5000, // Port for the application
    dbURI: process.env.DB_URI || 'mongodb://localhost:27017/ArtNexusDb1', // Database URI
    sessionSecret: process.env.SESSION_SECRET || 'your-session-secret', // Secret for session
    isProduction: process.env.NODE_ENV === 'production', // Check if in production environment
};

// Export the configuration
module.exports = appConfig;
