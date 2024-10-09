// Import the required modules
const app = require('./app'); // Import the Express application
const appConfig = require('./src/config/appConfig'); // Load application configurations

// Start the server
const PORT = appConfig.port || 5000; // Set the port from config or default to 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log the server start
});
