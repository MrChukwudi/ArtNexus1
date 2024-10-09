// src/services/artService.js

// Importing models
const Art = require('../models/artModel');
const User = require('../models/userModel');
const Country = require('../models/countryModel');
const ArtType = require('../models/artTypeModel');
const Purchase = require('../models/purchaseModel');

// Importing error handler utilities
const { createError } = require('../utils/helpers');

// Art Service: handles all business logic related to art management
const artService = {

  // 1. Create a new Art
  async createArt(artData, artistId) {
    try {
      // Step 1: Validate that the artist exists in the database
      const artist = await User.findById(artistId);
      if (!artist) {
        throw createError('Artist not found', 404);
      }

      // Step 2: Ensure the country and art type are valid
      const country = await Country.findById(artData.countryId);
      const artType = await ArtType.findById(artData.artTypeId);

      if (!country || !artType) {
        throw createError('Invalid country or art type', 400);
      }

      // Step 3: Create a new Art entry
      const newArt = new Art({
        ...artData,
        artiste: artistId,
        country: artData.countryId,
        artType: artData.artTypeId,
      });

      // Step 4: Save the new Art to the database
      await newArt.save();

      return newArt; // Return the newly created art object
    } catch (error) {
      throw error;
    }
  },

  // 2. Get all Arts with optional filtering by country and category (art type)
  async getAllArts(filter = {}) {
    try {
      // Step 1: Define filtering conditions
      let query = {};
      if (filter.countryId) query.country = filter.countryId;
      if (filter.artTypeId) query.artType = filter.artTypeId;
      if (filter.isApproved !== undefined) query.isApproved = filter.isApproved; // Approved or unapproved arts

      // Step 2: Query the database for all arts matching the filter
      const arts = await Art.find(query)
        .populate('artiste', 'name email')   // Populating artiste details
        .populate('country', 'countryName')  // Populating country details
        .populate('artType', 'name')         // Populating art type details

      return arts;
    } catch (error) {
      throw error;
    }
  },

  // 3. Get a single Art by ID
  async getArtById(artId) {
    try {
      // Step 1: Query the database to get art by ID
      const art = await Art.findById(artId)
        .populate('artiste', 'name email')
        .populate('country', 'countryName')
        .populate('artType', 'name');

      if (!art) {
        throw createError('Art not found', 404);
      }

      return art;
    } catch (error) {
      throw error;
    }
  },

  // 4. Update an Art (artist must be authorized)
  async updateArt(artId, updatedData, artistId) {
    try {
      // Step 1: Find the art by ID
      const art = await Art.findById(artId);
      if (!art) {
        throw createError('Art not found', 404);
      }

      // Step 2: Check if the artist owns the art
      if (art.artiste.toString() !== artistId.toString()) {
        throw createError('Not authorized to update this art', 403);
      }

      // Step 3: Update the art data with the new details
      Object.assign(art, updatedData);

      // Step 4: Save the updated art to the database
      await art.save();

      return art; // Return the updated art object
    } catch (error) {
      throw error;
    }
  },

  // 5. Delete an Art (artist must be authorized)
  async deleteArt(artId, artistId) {
    try {
      // Step 1: Find the art by ID
      const art = await Art.findById(artId);
      if (!art) {
        throw createError('Art not found', 404);
      }

      // Step 2: Check if the artist owns the art
      if (art.artiste.toString() !== artistId.toString()) {
        throw createError('Not authorized to delete this art', 403);
      }

      // Step 3: Remove the art from the database
      await art.remove();

      return { message: 'Art successfully deleted' };
    } catch (error) {
      throw error;
    }
  },

  // 6. Approve an Art submission (Admin function)
  async approveArt(artId, adminId) {
    try {
      // Step 1: Find the art by ID
      const art = await Art.findById(artId);
      if (!art) {
        throw createError('Art not found', 404);
      }

      // Step 2: Set the art as approved
      art.isApproved = true;

      // Step 3: Save the updated art to the database
      await art.save();

      return art; // Return the approved art
    } catch (error) {
      throw error;
    }
  },

  // 7. Handle Art purchase (Admin approval required)
  async purchaseArt(artId, userId) {
    try {
      // Step 1: Find the art by ID
      const art = await Art.findById(artId);
      if (!art || !art.isApproved) {
        throw createError('Art not available for purchase', 404);
      }

      // Step 2: Create a purchase entry
      const purchase = new Purchase({
        art: artId,
        registeredUser: userId,
        purchaseDate: new Date(),
        isApproved: false, // Pending admin approval
      });

      // Step 3: Save the purchase entry
      await purchase.save();

      return purchase; // Return the purchase entry
    } catch (error) {
      throw error;
    }
  },
};

module.exports = artService;
