const userService = require('../services/userService');

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
