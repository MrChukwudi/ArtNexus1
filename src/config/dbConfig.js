// Import the required modules
const mongoose = require('mongoose'); // MongoDB object modeling tool
const appConfig = require('./appConfig'); // Load application configurations
const {Admin} = require('../models/userModel');
require('dotenv').config();


// Define a function to connect to the MongoDB database
const connect = async () => {
    try {
        await mongoose.connect(appConfig.dbURI, { // Connect to the database
            useNewUrlParser: true, // Use the new URL string parser
            useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
        });
        seedData();
        console.log('Database connected successfully'); // Log successful connection
    } catch (error) {
        console.error('Database connection error:', error); // Log connection error
        process.exit(1); // Exit process with failure
    }
};






async function seedData() {
    try {
      // Check if admin users already exist
      const existingAdmin1 = await Admin.findOne({ name: 'admin1' });
      const existingAdmin2 = await Admin.findOne({ name: 'admin2' });
      
      if (!existingAdmin1) {
        const admin1 = new Admin({
          name: 'admin1',
          email: 'admin1@example.com',
          password: 'admin123', // Replace with a secure password
          role: 'admin' // Or define a role enum
        });
  
        await admin1.save();
        console.log('Admin 1 seeded successfully');
      } else {
        console.log('Admin 1 already exists');
    }
  
      if (!existingAdmin2) {
        const admin2 = new Admin({
          name: 'admin2',
          email: 'admin2@example.com',
          password: 'admin123', // Replace with a secure password
          role: 'admin'
        });
  
        await admin2.save();
        console.log('Admin 2 seeded successfully');
    } else {
        console.log('Admin 2 already exists');
    }
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }
    
  
  
  
  // Export the connect function
    module.exports = { connect };