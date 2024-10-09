const artService = require('../services/artService');
const purchaseService = require('../services/purchaseService');
const userService = require('../services/userService');
const messageService = require('../services/messageService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');





// Admin Login


const User = require('../models/userModel'); // Assuming your User schema is in userModel


// Admin login controller
exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the admin by username
        const admin = await User.findOne({ username, role: 'Admin' });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Create a JWT token for the admin
        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET, // Replace with your JWT secret
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Send the token as part of the response
        res.status(200).json({
            message: 'Login successful',
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


/*
exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the admin by username
        const admin = await userService.getAdminByUsername(username);
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if the provided password matches the stored password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token or use session-based authentication
        const token = jwt.sign({ id: admin._id, role: 'Admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token or set it as a cookie
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

*/


// Controller for approving an art piece
exports.approveArt = async (req, res) => {
    try {
        const { artId } = req.params;
        // Use the service to approve the art
        const result = await artService.approveArt(artId);
        res.status(200).json({ message: 'Art approved successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error approving art', error });
    }
};

// View all art purchases
exports.viewAllPurchases = async (req, res) => {
    try {
        const purchases = await purchaseService.getAllPurchases();
        res.status(200).json({ message: 'Purchases retrieved successfully', data: purchases });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving purchases', error });
    }
};

// Approve a purchase to credit the artist's wallet
exports.approvePurchase = async (req, res) => {
    try {
        const { purchaseId } = req.params;
        const result = await purchaseService.approvePurchase(purchaseId);
        res.status(200).json({ message: 'Purchase approved, artist wallet credited', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error approving purchase', error });
    }
};

// View specific art details
exports.viewArtDetails = async (req, res) => {
    try {
        const { artId } = req.params;
        const artDetails = await artService.getArtDetails(artId);
        res.status(200).json({ message: 'Art details retrieved successfully', data: artDetails });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving art details', error });
    }
};

// View all artistes
exports.viewAllArtistes = async (req, res) => {
    try {
        const artistes = await userService.getAllArtistes();
        res.status(200).json({ message: 'Artistes retrieved successfully', data: artistes });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving artistes', error });
    }
};

// View artiste details
exports.viewArtisteDetails = async (req, res) => {
    try {
        const { artisteId } = req.params;
        const artisteDetails = await userService.getArtisteDetails(artisteId);
        res.status(200).json({ message: 'Artiste details retrieved successfully', data: artisteDetails });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving artiste details', error });
    }
};

// Edit artiste's access (e.g., based on subscription)
exports.editArtisteAccess = async (req, res) => {
    try {
        const { artisteId } = req.params;
        const updatedAccess = await userService.editArtisteAccess(artisteId, req.body);
        res.status(200).json({ message: 'Artiste access updated successfully', data: updatedAccess });
    } catch (error) {
        res.status(500).json({ message: 'Error updating artiste access', error });
    }
};

// View all messages with artistes
exports.viewMessagesWithArtistes = async (req, res) => {
    try {
        const messages = await messageService.getMessagesWithArtistes(req.user.id); // Assuming req.user.id is the admin ID
        res.status(200).json({ message: 'Messages retrieved successfully', data: messages });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving messages', error });
    }
};

// Send a message to an artiste
exports.sendMessageToArtiste = async (req, res) => {
    try {
        const { artisteId } = req.params;
        const message = await messageService.sendMessage(req.user.id, artisteId, req.body.message);
        res.status(200).json({ message: 'Message sent successfully', data: message });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
};
