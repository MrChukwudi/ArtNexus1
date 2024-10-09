// messageService.js

// Import necessary modules
const Message = require('../models/messageModel'); // Import the Message model
const Collaboration = require('../models/collaborationModel'); // Import the Collaboration model
const User = require('../models/userModel'); // Import the User model

/**
 * Send a message in a collaboration.
 * @param {Object} sender - The user sending the message.
 * @param {String} collaborationId - The ID of the collaboration.
 * @param {String} content - The message content.
 * @returns {Promise<Object>} - The created message.
 */
const sendMessageInCollaboration = async (sender, collaborationId, content) => {
  try {
    // Check if the collaboration exists
    const collaboration = await Collaboration.findById(collaborationId);
    if (!collaboration) {
      throw new Error('Collaboration not found.');
    }

    // Create a new message instance
    const newMessage = new Message({
      senderID: sender._id,
      collaborationID: collaborationId,
      content,
      createdAt: new Date(),
      status: 'active', // Message status is active when created
    });

    // Save the message to the database
    await newMessage.save();
    return newMessage; // Return the created message
  } catch (error) {
    throw new Error(`Error sending message: ${error.message}`); // Handle errors
  }
};

/**
 * Get all messages for a specific collaboration.
 * @param {String} collaborationId - The ID of the collaboration.
 * @returns {Promise<Array>} - List of messages in the collaboration.
 */
const getMessagesForCollaboration = async (collaborationId) => {
  try {
    // Find all messages related to the collaboration
    const messages = await Message.find({ collaborationID: collaborationId })
      .populate('senderID', 'name email') // Populate sender details
      .sort({ createdAt: 1 }); // Sort messages by creation date
    return messages; // Return the list of messages
  } catch (error) {
    throw new Error(`Error retrieving messages: ${error.message}`); // Handle errors
  }
};

/**
 * Mark a message as read or delete it based on the provided status.
 * @param {String} messageId - The ID of the message to update.
 * @param {Boolean} isRead - Indicates whether the message is read.
 * @returns {Promise<Object>} - The updated message.
 */
const updateMessageStatus = async (messageId, isRead) => {
  try {
    // Update the message status
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { isRead },
      { new: true } // Return the updated document
    );

    if (!updatedMessage) {
      throw new Error('Message not found.');
    }

    return updatedMessage; // Return the updated message
  } catch (error) {
    throw new Error(`Error updating message status: ${error.message}`); // Handle errors
  }
};

// Export the message service functions
module.exports = {
  sendMessageInCollaboration,
  getMessagesForCollaboration,
  updateMessageStatus,
};
