const express = require('express');
const { authenticateUser } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

// Authentication required for user routes
router.use(authenticateUser);

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided details.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with username and password.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid username or password
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: User logout
 *     description: Logs out the currently authenticated user.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.post('/logout', userController.logout);

/**
 * @swagger
 * /api/user/my-purchases:
 *   get:
 *     summary: View user's purchased arts list
 *     description: Retrieves a list of arts purchased by the authenticated user.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successfully retrieved purchases
 *       401:
 *         description: Unauthorized access
 */
router.get('/my-purchases', userController.viewMyPurchases);

/**
 * @swagger
 * /api/user/top-up-wallet:
 *   post:
 *     summary: Top up the user's wallet
 *     description: Adds funds to the user's wallet.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Wallet topped up successfully
 *       400:
 *         description: Invalid amount
 */
router.post('/top-up-wallet', userController.topUpWallet);

/**
 * @swagger
 * /api/user/fund-wallet:
 *   post:
 *     summary: Fund the user's wallet
 *     description: Funds the user's wallet for purchasing arts.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Wallet funded successfully
 *       400:
 *         description: Invalid amount
 */
router.post('/fund-wallet', userController.fundWallet);

/**
 * @swagger
 * /api/user/buy-art/{artId}:
 *   post:
 *     summary: Buy an art piece
 *     description: Purchases an art piece by its ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: artId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Art purchased successfully
 *       404:
 *         description: Art not found
 */
router.post('/buy-art/:artId', userController.buyArt);

/**
 * @swagger
 * /api/user/purchased-art/{artId}:
 *   get:
 *     summary: View purchased art details
 *     description: Retrieves details of a specific purchased art piece by its ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: artId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved art details
 *       404:
 *         description: Art not found
 */
router.get('/purchased-art/:artId', userController.viewPurchasedArtDetails);

module.exports = router;
