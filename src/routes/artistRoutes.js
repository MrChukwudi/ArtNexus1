const express = require('express');
const { authenticateUser, authorizeRoles } = require('../middlewares/authMiddleware');
const artistController = require('../controllers/artistController');

const router = express.Router();

// Authentication required for artist routes
router.use(authenticateUser);
router.use(authorizeRoles(['Artiste']));

/**
 * @swagger
 * /api/artist/register:
 *   post:
 *     summary: Register a new artist
 *     description: Allows a new artist to register with the application.
 *     tags:
 *       - Artist
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
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Artist registered successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/register', artistController.register);

/**
 * @swagger
 * /api/artist/login:
 *   post:
 *     summary: Artist login
 *     description: Authenticates an artist with username and password.
 *     tags:
 *       - Artist
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
router.post('/login', artistController.login);

/**
 * @swagger
 * /api/artist/logout:
 *   post:
 *     summary: Artist logout
 *     description: Logs out the currently authenticated artist.
 *     tags:
 *       - Artist
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.post('/logout', artistController.logout);

/**
 * @swagger
 * /api/artist/create-collaboration:
 *   post:
 *     summary: Create a new collaboration
 *     description: Allows an artist to create a new collaboration.
 *     tags:
 *       - Artist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               participants:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Collaboration created successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/create-collaboration', artistController.createCollaboration);

/**
 * @swagger
 * /api/artist/my-collaborations:
 *   get:
 *     summary: View own collaborations
 *     description: Retrieve a list of collaborations that the artist is part of.
 *     tags:
 *       - Artist
 *     responses:
 *       200:
 *         description: Collaborations retrieved successfully
 *       404:
 *         description: No collaborations found
 */
router.get('/my-collaborations', artistController.viewMyCollaborations);

/**
 * @swagger
 * /api/artist/edit-collaboration/{collaborationId}:
 *   put:
 *     summary: Edit an existing collaboration
 *     description: Update details of an existing collaboration.
 *     tags:
 *       - Artist
 *     parameters:
 *       - name: collaborationId
 *         in: path
 *         required: true
 *         description: The ID of the collaboration to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Collaboration updated successfully
 *       404:
 *         description: Collaboration not found
 */
router.put('/edit-collaboration/:collaborationId', artistController.editCollaboration);

/**
 * @swagger
 * /api/artist/delete-collaboration/{collaborationId}:
 *   delete:
 *     summary: Delete a collaboration
 *     description: Removes an existing collaboration.
 *     tags:
 *       - Artist
 *     parameters:
 *       - name: collaborationId
 *         in: path
 *         required: true
 *         description: The ID of the collaboration to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Collaboration deleted successfully
 *       404:
 *         description: Collaboration not found
 */
router.delete('/delete-collaboration/:collaborationId', artistController.deleteCollaboration);

/**
 * @swagger
 * /api/artist/all-collaborations:
 *   get:
 *     summary: View all collaborations created by other artists
 *     description: Retrieve a list of all collaborations created by other artists.
 *     tags:
 *       - Artist
 *     responses:
 *       200:
 *         description: Collaborations retrieved successfully
 *       404:
 *         description: No collaborations found
 */
router.get('/all-collaborations', artistController.viewAllCollaborations);

/**
 * @swagger
 * /api/artist/join-collaboration/{collaborationId}:
 *   post:
 *     summary: Join a collaboration
 *     description: Allows an artist to join a specified collaboration.
 *     tags:
 *       - Artist
 *     parameters:
 *       - name: collaborationId
 *         in: path
 *         required: true
 *         description: The ID of the collaboration to join
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully joined collaboration
 *       404:
 *         description: Collaboration not found
 */
router.post('/join-collaboration/:collaborationId', artistController.joinCollaboration);

/**
 * @swagger
 * /api/artist/send-message/{collaborationId}:
 *   post:
 *     summary: Send message within a collaboration
 *     description: Allows an artist to send a message in a specified collaboration.
 *     tags:
 *       - Artist
 *     parameters:
 *       - name: collaborationId
 *         in: path
 *         required: true
 *         description: The ID of the collaboration
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
 *         description: Collaboration not found
 */
router.post('/send-message/:collaborationId', artistController.sendMessageInCollaboration);

/**
 * @swagger
 * /api/artist/send-message-admin:
 *   post:
 *     summary: Send message to admin
 *     description: Allows an artist to send a message to the admin.
 *     tags:
 *       - Artist
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
 */
router.post('/send-message-admin', artistController.sendMessageToAdmin);

module.exports = router;
