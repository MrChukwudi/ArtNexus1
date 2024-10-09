const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // Library to hash passwords
const jwt = require('jsonwebtoken'); // JWT library to create tokens
const appConfig = require('../config/appConfig');

// Service to register a new user
exports.registerUser = async (userData) => {
    const { email, password } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ ...userData, password: hashedPassword });
    await newUser.save(); // Save the new user
    return newUser;
};

// Service to log in a user
exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password); // Compare passwords
    if (!isPasswordMatch) {
        throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ id: user._id }, appConfig.sessionSecret, { expiresIn: '1d' }); // Generate JWT token
    return { user, token };
};
