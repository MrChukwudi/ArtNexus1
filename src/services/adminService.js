const Art = require('../models/artModel'); // Art model

// Service to approve art submission
exports.approveArt = async (artId) => {
    const art = await Art.findById(artId); // Find art by ID
    if (!art) {
        throw new Error('Art not found');
    }
    art.isApproved = true; // Set art as approved
    await art.save(); // Save the updated art
    return art;
};

// Service to retrieve all purchases
exports.getAllPurchases = async () => {
    // Mock logic; ideally, we would query a Purchase model
    const purchases = []; // Retrieve all purchases from the database
    return purchases;
};
