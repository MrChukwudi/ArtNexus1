const swaggerJsDoc = require('swagger-jsdoc'); // Imports swagger-jsdoc to auto-generate Swagger docs

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Specifies the OpenAPI version
        info: {
            title: 'ArtNexus API', // Title of the API
            version: '1.0.0', // Version of the API
            description: 'API documentation for the ArtNexus project', // Short description of the API
            contact: {
                name: 'Support Team', // Contact information for API support
                email: 'support@artnexus.com' // Email for support
            }
        },
        servers: [
            {
                url: 'http://localhost:5000', // Your local server's base URL
                description: 'Local server' // Description for the server
            }
        ],
    },
    apis: ['./src/routes/*.js', './src/models/*.js'], // Adjusted relative paths to match the correct file structure
};

// Optional console log for debugging
console.log("swaggerDoc runs Ok!");

// Generates the Swagger docs using the options
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs; // Exports the Swagger documentation for use in app.js
