const userService = require('../services/userService');
const purchaseService = require('../services/purchaseService');

// Register a new user
exports.register = async (req, res) => {
    try {
        const result = await userService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// User login
exports.login = async (req, res) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({ message: 'Login successful', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// User logout
exports.logout = async (req, res) => {
    try {
        await userService.logout(req.user.id);
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }
};

// View user's purchased arts
exports.viewMyPurchases = async (req, res) => {
    try {
        const purchases = await purchaseService.getUserPurchases(req.user.id);
        res.status(200).json({ message: 'My purchases retrieved successfully', data: purchases });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving purchases', error });
    }
};

// Top up the user's wallet
exports.topUpWallet = async (req, res) => {
    try {
        const updatedWallet = await userService.topUpWallet(req.user.id, req.body.amount);
        res.status(200).json({ message: 'Wallet topped up successfully', data: updatedWallet });
    } catch (error) {
        res.status(500).json({ message: 'Error topping up wallet', error });
    }
};

// Fund the user's wallet
exports.fundWallet = async (req, res) => {
    try {
        const result = await userService.fundWallet(req.user.id, req.body.amount);
        res.status(200).json({ message: 'Wallet funded successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error funding wallet', error });
    }
};

// Buy an art piece
exports.buyArt = async (req, res) => {
    try {
        const { artId } = req.params;
        const purchase = await purchaseService.buyArt(req.user.id, artId);
        res.status(200).json({ message: 'Art purchased successfully', data: purchase });
    } catch (error) {
        res.status(500).json({ message: 'Error purchasing art', error });
    }
};

// View details of purchased art
exports.viewPurchasedArtDetails = async (req, res) => {
    try {
        const { artId } = req.params;
        const artDetails = await purchaseService.getPurchasedArtDetails(req.user.id, artId);
        res.status(200).json({ message: 'Purchased art details retrieved successfully', data: artDetails });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving purchased art details', error });
    }
};
