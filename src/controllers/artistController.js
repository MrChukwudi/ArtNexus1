const userService = require('../services/userService');
const collaborationService = require('../services/collaborationService');
const messageService = require('../services/messageService');

// Register a new artist
exports.register = async (req, res) => {
    try {
        const result = await userService.registerArtiste(req.body);
        res.status(201).json({ message: 'Artist registered successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error registering artist', error });
    }
};

// Artist login
exports.login = async (req, res) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({ message: 'Login successful', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Artist logout
exports.logout = async (req, res) => {
    try {
        // Service method to clear session or token
        await userService.logout(req.user.id);
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }
};

// Create a new collaboration
exports.createCollaboration = async (req, res) => {
    try {
        const collaboration = await collaborationService.createCollaboration(req.body, req.user.id); // Using artist's ID
        res.status(201).json({ message: 'Collaboration created successfully', data: collaboration });
    } catch (error) {
        res.status(500).json({ message: 'Error creating collaboration', error });
    }
};

// View artist's own collaborations
exports.viewMyCollaborations = async (req, res) => {
    try {
        const collaborations = await collaborationService.getMyCollaborations(req.user.id);
        res.status(200).json({ message: 'My collaborations retrieved successfully', data: collaborations });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving collaborations', error });
    }
};

// Edit an existing collaboration
exports.editCollaboration = async (req, res) => {
    try {
        const { collaborationId } = req.params;
        const updatedCollaboration = await collaborationService.editCollaboration(collaborationId, req.body);
        res.status(200).json({ message: 'Collaboration updated successfully', data: updatedCollaboration });
    } catch (error) {
        res.status(500).json({ message: 'Error updating collaboration', error });
    }
};

// Delete a collaboration
exports.deleteCollaboration = async (req, res) => {
    try {
        const { collaborationId } = req.params;
        await collaborationService.deleteCollaboration(collaborationId);
        res.status(200).json({ message: 'Collaboration deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting collaboration', error });
    }
};

// View all collaborations created by other artists
exports.viewAllCollaborations = async (req, res) => {
    try {
        const collaborations = await collaborationService.getAllCollaborations();
        res.status(200).json({ message: 'All collaborations retrieved successfully', data: collaborations });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving collaborations', error });
    }
};

// Join a collaboration
exports.joinCollaboration = async (req, res) => {
    try {
        const { collaborationId } = req.params;
        const result = await collaborationService.joinCollaboration(collaborationId, req.user.id);
        res.status(200).json({ message: 'Successfully joined collaboration', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error joining collaboration', error });
    }
};

// Send message within a collaboration
exports.sendMessageInCollaboration = async (req, res) => {
    try {
        const { collaborationId } = req.params;
        const message = await messageService.sendMessageInCollaboration(collaborationId, req.user.id, req.body.message);
        res.status(200).json({ message: 'Message sent successfully in collaboration', data: message });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message in collaboration', error });
    }
};

// Send a message to admin (default collaboration)
exports.sendMessageToAdmin = async (req, res) => {
    try {
        const message = await messageService.sendMessageToAdmin(req.user.id, req.body.message);
        res.status(200).json({ message: 'Message sent to admin successfully', data: message });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message to admin', error });
    }
};
