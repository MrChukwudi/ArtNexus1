// notificationModel.js

// Import necessary modules
const mongoose = require('mongoose');

// Create a schema for notifications
const notificationSchema = new mongoose.Schema({
  recipientID: { // ID of the user receiving the notification
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Reference to the User model
  },
  message: { // The notification message
    type: String,
    required: true
  },
  isRead: { // Indicates if the notification has been read
    type: Boolean,
    default: false // Default is false when created
  },
  createdAt: { // Timestamp for when the notification was created
    type: Date,
    default: Date.now // Set to current date by default
  },
});

// Create a model based on the notification schema
const Notification = mongoose.model('Notification', notificationSchema);

// Export the Notification model for use in other parts of the application
module.exports = Notification;
