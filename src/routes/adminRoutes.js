const express = require('express');
const { authenticateUser, authorizeRoles } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

const router = express.Router();

// All admin routes are protected and only accessible to users with the 'Admin' role
/*
router.use(authenticateUser);
router.use(authorizeRoles(['Admin']));
*/

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     description: Authenticate an admin with username and password.
 *     tags:
 *       - Admin
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
router.post('/login', adminController.adminLogin);

/**
 * @swagger
 * /api/admin/approve-art/{artId}:
 *   post:
 *     summary: Approve an art piece
 *     description: Approve an art piece created by an artist.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: artId
 *         required: true
 *         description: ID of the art piece to approve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Art approved successfully
 *       404:
 *         description: Art not found
 */
router.post('/approve-art/:artId', adminController.approveArt);

/**
 * @swagger
 * /api/admin/view-purchases:
 *   get:
 *     summary: View all purchases
 *     description: Retrieve a list of all art purchases.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Purchases retrieved successfully
 *       500:
 *         description: Error retrieving purchases
 */
router.get('/view-purchases', adminController.viewAllPurchases);

/**
 * @swagger
 * /api/admin/approve-purchase/{purchaseId}:
 *   post:
 *     summary: Approve an art purchase
 *     description: Approve an art purchase to credit the artist's wallet.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: purchaseId
 *         required: true
 *         description: ID of the purchase to approve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Purchase approved successfully
 *       404:
 *         description: Purchase not found
 */
router.post('/approve-purchase/:purchaseId', adminController.approvePurchase);

/**
 * @swagger
 * /api/admin/art-details/{artId}:
 *   get:
 *     summary: View specific art details
 *     description: Retrieve details of a specific art piece.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: artId
 *         required: true
 *         description: ID of the art piece to view
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Art details retrieved successfully
 *       404:
 *         description: Art not found
 */
router.get('/art-details/:artId', adminController.viewArtDetails);

/**
 * @swagger
 * /api/admin/view-artistes:
 *   get:
 *     summary: View all artistes
 *     description: Retrieve a list of all artistes.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Artistes retrieved successfully
 *       500:
 *         description: Error retrieving artistes
 */
router.get('/view-artistes', adminController.viewAllArtistes);

/**
 * @swagger
 * /api/admin/artiste-details/{artisteId}:
 *   get:
 *     summary: View specific artiste details
 *     description: Retrieve details of a specific artiste.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: artisteId
 *         required: true
 *         description: ID of the artiste to view
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artiste details retrieved successfully
 *       404:
 *         description: Artiste not found
 */
router.get('/artiste-details/:artisteId', adminController.viewArtisteDetails);

/**
 * @swagger
 * /api/admin/edit-artiste-access/{artisteId}:
 *   put:
 *     summary: Edit artiste access
 *     description: Edit access for an artiste based on subscription status.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: artisteId
 *         required: true
 *         description: ID of the artiste to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessLevel:
 *                 type: string
 *     responses:
 *       200:
 *         description: Artiste access updated successfully
 *       404:
 *         description: Artiste not found
 */
router.put('/edit-artiste-access/:artisteId', adminController.editArtisteAccess);

/**
 * @swagger
 * /api/admin/messages:
 *   get:
 *     summary: View all messages with artistes
 *     description: Retrieve messages exchanged with artistes.
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *       500:
 *         description: Error retrieving messages
 */
router.get('/messages', adminController.viewMessagesWithArtistes);

/**
 * @swagger
 * /api/admin/send-message/{artisteId}:
 *   post:
 *     summary: Send a message to an artiste
 *     description: Send a message to a specific artiste.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: artisteId
 *         required: true
 *         description: ID of the artiste to send a message
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       404:
 *         description: Artiste not found
 *       500:
 *         description: Error sending message
 */
router.post('/send-message/:artisteId', adminController.sendMessageToArtiste);

module.exports = router;
