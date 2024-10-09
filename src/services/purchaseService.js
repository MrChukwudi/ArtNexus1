// purchaseService.js

// Import necessary models
const Art = require('../models/artModel');
const Purchase = require('../models/purchaseModel');
const RegisteredUser = require('../models/userModel'); // This is where the wallet resides
const Notification = require('../models/notificationModel');

// Utility to create a notification
const { createNotification } = require('../utils/helpers');

// Purchase Service for managing art purchases
const purchaseService = {
  /**
   * Handles purchasing an art by a registered user.
   * @param {Object} user - The registered user making the purchase.
   * @param {ObjectId} artId - The ID of the art to be purchased.
   * @returns {Object} Purchase details
   */
  async purchaseArt(user, artId) {
    try {
      // Step 1: Find the art by its ID
      const art = await Art.findById(artId);
      if (!art) {
        throw new Error('Art not found'); // If art does not exist, throw an error
      }

      // Step 2: Check if the art is available for purchase
      if (!art.isAvailableForPurchase) {
        throw new Error('Art is not available for purchase'); // If art is not available, throw an error
      }

      // Step 3: Check if the user has enough wallet balance to make the purchase
      if (user.walletBalance < art.price) {
        throw new Error('Insufficient balance in wallet'); // If balance is insufficient, throw an error
      }

      // Step 4: Deduct the price of the art from the user's wallet
      user.walletBalance -= art.price; // Subtract the art price from the user's wallet balance
      await user.save(); // Save the user's new wallet balance to the database

      // Step 5: Create a new purchase entry
      const purchase = new Purchase({
        registeredUserID: user._id, // Link the purchase to the user
        artID: artId, // Link the purchase to the art being bought
        purchaseDate: new Date(), // Record the date of purchase
      });

      await purchase.save(); // Save the purchase details to the database

      // Step 6: Send a notification to the artiste about the purchase
      await createNotification(art.artisteID, `Your art '${art.title}' has been purchased`);

      // Step 7: Return the purchase details
      return purchase; // Return the created purchase object
    } catch (error) {
      // Handle errors that occur during the purchase process
      throw new Error(`Error purchasing art: ${error.message}`); // Throw an error with a descriptive message
    }
  },

  /**
   * Approves a purchase (Admin action).
   * Credits the artiste's wallet once a purchase is approved.
   * @param {ObjectId} purchaseId - The ID of the purchase to approve.
   * @returns {Object} Updated purchase with approval status
   */
  async approvePurchase(purchaseId) {
    try {
      // Step 1: Find the purchase by its ID and populate related art information
      const purchase = await Purchase.findById(purchaseId).populate('art');
      if (!purchase) {
        throw new Error('Purchase not found'); // If purchase does not exist, throw an error
      }

      // Step 2: Check if the purchase is already approved
      if (purchase.isApproved) {
        throw new Error('Purchase is already approved'); // If already approved, throw an error
      }

      // Step 3: Approve the purchase
      purchase.isApproved = true; // Set the approval status to true
      await purchase.save(); // Save the updated purchase details to the database

      // Step 4: Credit the artiste's wallet with the purchase amount
      const art = purchase.art; // Get the art associated with the purchase
      const artiste = await RegisteredUser.findById(art.artisteID); // Find the artiste by ID
      artiste.walletBalance += art.price; // Add the art price to the artiste's wallet balance
      await artiste.save(); // Save the updated artiste's wallet balance to the database

      // Step 5: Notify the artiste of the approved purchase
      await createNotification(art.artisteID, `Your art '${art.title}' purchase has been approved`);

      // Step 6: Return the updated purchase details
      return purchase; // Return the updated purchase object
    } catch (error) {
      // Handle errors that occur during the purchase approval process
      throw new Error(`Error approving purchase: ${error.message}`); // Throw an error with a descriptive message
    }
  },

  /**
   * Fetches all purchases made by a specific user.
   * @param {ObjectId} userId - The ID of the registered user.
   * @returns {Array} List of purchases
   */
  async getUserPurchases(userId) {
    try {
      // Step 1: Find all purchases made by the user
      const purchases = await Purchase.find({ registeredUserID: userId }).populate('art'); // Populate art details
      return purchases; // Return the list of purchases
    } catch (error) {
      // Handle errors that occur during fetching user purchases
      throw new Error(`Error fetching user purchases: ${error.message}`); // Throw an error with a descriptive message
    }
  },

  /**
   * Fetches all purchases for Admin to review.
   * @returns {Array} List of all purchases.
   */
  async getAllPurchases() {
    try {
      // Step 1: Find all purchases in the database
      const purchases = await Purchase.find().populate('art'); // Populate art details for each purchase
      return purchases; // Return the list of all purchases
    } catch (error) {
      // Handle errors that occur during fetching all purchases
      throw new Error(`Error fetching all purchases: ${error.message}`); // Throw an error with a descriptive message
    }
  },
};

// Export the purchaseService for use in other parts of the application
module.exports = purchaseService;
