const Art = require('../models/artModel');
const Collaboration = require('../models/collaborationModel');

// Service to create new art
exports.createArt = async (artData, artistId) => {
    const art = new Art({ ...artData, artist: artistId }); // Create new art instance
    await art.save(); // Save the new art in the database
    return art;
};

// Service to get all arts created by a specific artist
exports.getArtsByArtist = async (artistId) => {
    const arts = await Art.find({ artist: artistId }); // Find all arts by artist ID
    return arts;
};

// Service to create a collaboration between two artists
exports.createCollaboration = async (artistId, collaborationData) => {
    const collaboration = new Collaboration({ ...collaborationData, artist: artistId });
    await collaboration.save(); // Save collaboration
    return collaboration;
};
