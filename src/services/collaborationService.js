// collaborationService.js

// Import necessary modules
const Collaboration = require('../models/collaborationModel'); // Import the Collaboration model
const User = require('../models/userModel'); // Import the User model
const Message = require('../models/messageModel'); // Import the Message model

/**
 * Create a new collaboration.
 * @param {Object} artiste - The artiste creating the collaboration.
 * @param {Object} collaborationData - The collaboration details.
 * @returns {Promise<Object>} - The created collaboration.
 */
const createCollaboration = async (artiste, collaborationData) => {
  try {
    // Create a new collaboration instance with the provided data
    const newCollaboration = new Collaboration({
      artisteID: artiste._id,
      projectName: collaborationData.projectName,
      description: collaborationData.description,
      skillsRequired: collaborationData.skillsRequired,
      numberOfCollaborators: collaborationData.numberOfCollaborators,
      collaborators: [artiste._id], // Initially, the creator is the first collaborator
    });

    // Save the collaboration to the database
    await newCollaboration.save();
    return newCollaboration; // Return the created collaboration
  } catch (error) {
    throw new Error(`Error creating collaboration: ${error.message}`); // Handle errors
  }
};

/**
 * Get all collaborations for a specific artiste.
 * @param {String} artisteId - The ID of the artiste.
 * @returns {Promise<Array>} - List of collaborations for the artiste.
 */
const getCollaborationsForArtiste = async (artisteId) => {
  try {
    // Find all collaborations where the artiste is a collaborator
    const collaborations = await Collaboration.find({
      $or: [{ artisteID: artisteId }, { collaborators: artisteId }],
    });
    return collaborations; // Return the list of collaborations
  } catch (error) {
    throw new Error(`Error retrieving collaborations: ${error.message}`); // Handle errors
  }
};

/**
 * Edit an existing collaboration.
 * @param {String} collaborationId - The ID of the collaboration to edit.
 * @param {Object} updates - The updates to apply to the collaboration.
 * @returns {Promise<Object>} - The updated collaboration.
 */
const editCollaboration = async (collaborationId, updates) => {
  try {
    // Find the collaboration and update it with new values
    const updatedCollaboration = await Collaboration.findByIdAndUpdate(
      collaborationId,
      updates,
      { new: true } // Return the updated document
    );

    if (!updatedCollaboration) {
      throw new Error('Collaboration not found.'); // Handle case where collaboration doesn't exist
    }

    return updatedCollaboration; // Return the updated collaboration
  } catch (error) {
    throw new Error(`Error editing collaboration: ${error.message}`); // Handle errors
  }
};

/**
 * Delete a collaboration.
 * @param {String} collaborationId - The ID of the collaboration to delete.
 * @returns {Promise<Object>} - The deleted collaboration.
 */
const deleteCollaboration = async (collaborationId) => {
  try {
    // Find the collaboration and delete it from the database
    const deletedCollaboration = await Collaboration.findByIdAndDelete(collaborationId);

    if (!deletedCollaboration) {
      throw new Error('Collaboration not found.'); // Handle case where collaboration doesn't exist
    }

    return deletedCollaboration; // Return the deleted collaboration
  } catch (error) {
    throw new Error(`Error deleting collaboration: ${error.message}`); // Handle errors
  }
};

/**
 * Join an existing collaboration.
 * @param {String} collaborationId - The ID of the collaboration to join.
 * @param {Object} artiste - The artiste joining the collaboration.
 * @returns {Promise<Object>} - The updated collaboration.
 */
const joinCollaboration = async (collaborationId, artiste) => {
  try {
    // Find the collaboration to update the list of collaborators
    const updatedCollaboration = await Collaboration.findByIdAndUpdate(
      collaborationId,
      { $addToSet: { collaborators: artiste._id } }, // Add the artiste to the collaborators array
      { new: true } // Return the updated document
    );

    if (!updatedCollaboration) {
      throw new Error('Collaboration not found.'); // Handle case where collaboration doesn't exist
    }

    return updatedCollaboration; // Return the updated collaboration
  } catch (error) {
    throw new Error(`Error joining collaboration: ${error.message}`); // Handle errors
  }
};

// Export the collaboration service functions
module.exports = {
  createCollaboration,
  getCollaborationsForArtiste,
  editCollaboration,
  deleteCollaboration,
  joinCollaboration,
};
