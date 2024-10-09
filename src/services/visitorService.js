// visitorService.js

// Import necessary modules
const User = require('../models/userModel'); // Import the User model
const Art = require('../models/artModel'); // Import the Art model
const Purchase = require('../models/purchaseModel'); // Import the Purchase model




/**
 * Register a new user (visitor).
 * @param {Object} userData - The user registration details.
 * @returns {Promise<Object>} - The created user object.
 */
const registerVisitor = async (userData) => {
  try {
    // Create a new user instance with the provided registration data
    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: userData.password, // Password should be hashed in the controller or a middleware
      role: 'Registered User', // Set default role for registered users
      wallet: 0.0, // Initial wallet balance
    });

    // Save the new user to the database
    await newUser.save();
    return newUser; // Return the created user
  } catch (error) {
    throw new Error(`Error registering visitor: ${error.message}`); // Handle errors
  }
};





/**
 * Get a list of all available arts.
 * @returns {Promise<Array>} - List of all arts.
 */
const getAllArts = async () => {
  try {
    // Find all art items in the database
    const arts = await Art.find({});
    return arts; // Return the list of arts
  } catch (error) {
    throw new Error(`Error retrieving arts: ${error.message}`); // Handle errors
  }
};





/**
 * View details of a specific art piece.
 * @param {String} artId - The ID of the art to retrieve details for.
 * @returns {Promise<Object>} - The details of the specified art piece.
 */
const getArtDetails = async (artId) => {
  try {
    // Find the specific art piece by ID
    const art = await Art.findById(artId);
    if (!art) {
      throw new Error('Art not found.'); // Handle case where art doesn't exist
    }
    return art; // Return the art details
  } catch (error) {
    throw new Error(`Error retrieving art details: ${error.message}`); // Handle errors
  }
};





/**
 * Purchase an art piece.
 * @param {Object} user - The user making the purchase.
 * @param {String} artId - The ID of the art to purchase.
 * @returns {Promise<Object>} - The purchase confirmation details.
 */
const purchaseArt = async (user, artId) => {
  try {
    // Find the art piece to purchase
    const art = await Art.findById(artId);
    if (!art) {
      throw new Error('Art not found.'); // Handle case where art doesn't exist
    }

    // Check if user has sufficient wallet balance
    if (user.wallet < art.price) {
      throw new Error('Insufficient wallet balance for this purchase.'); // Handle insufficient funds
    }

    // Deduct the art price from the user's wallet
    user.wallet -= art.price;

    // Create a new purchase record
    const purchase = new Purchase({
      userId: user._id,
      artId: art._id,
      price: art.price,
      purchaseDate: new Date(),
    });

    // Save the purchase record to the database
    await purchase.save();

    // Save the updated user with the new wallet balance
    await user.save();

    return purchase; // Return purchase confirmation details
  } catch (error) {
    throw new Error(`Error purchasing art: ${error.message}`); // Handle errors
  }
};




/**
 * Top up the wallet of a registered user.
 * @param {Object} user - The user whose wallet is to be topped up.
 * @param {Number} amount - The amount to add to the wallet.
 * @returns {Promise<Object>} - The updated user with the new wallet balance.
 */
const topUpWallet = async (user, amount) => {
  try {
    // Validate the amount to ensure it's positive
    if (amount <= 0) {
      throw new Error('Top-up amount must be greater than zero.'); // Handle invalid amount
    }

    // Add the amount to the user's wallet
    user.wallet += amount;

    // Save the updated user with the new wallet balance
    await user.save();
    return user; // Return the updated user
  } catch (error) {
    throw new Error(`Error topping up wallet: ${error.message}`); // Handle errors
  }
};




// Export the visitor service functions
module.exports = {
  registerVisitor,
  getAllArts,
  getArtDetails,
  purchaseArt,
  topUpWallet,
};
