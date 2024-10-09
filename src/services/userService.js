const Art = require('../models/artModel');
//const Wallet = require('../models/walletModel');

// Service to retrieve purchased arts of a user
exports.getPurchasedArts = async (userId) => {
    const purchasedArts = await Art.find({ purchaser: userId }); // Find arts where the user is the purchaser
    return purchasedArts;
};



// Get Admin by Username
exports.getAdminByUsername = async (username) => {
    try {
        // Find an admin by username and role
        const admin = await User.findOne({ username, role: 'Admin' });
        return admin;
    } catch (error) {
        throw new Error('Error fetching admin');
    }
};

/*
// Service to retrieve user's wallet balance
exports.getWalletBalance = async (userId) => {
    const wallet = await Wallet.findOne({ user: userId }); // Find wallet by user ID
    return wallet.balance;
};
*/