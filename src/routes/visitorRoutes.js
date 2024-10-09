const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

/**
 * @swagger
 * /api/visitor/countries:
 *   get:
 *     summary: List all countries
 *     description: Retrieves a list of all countries.
 *     tags:
 *       - Visitor
 *     responses:
 *       200:
 *         description: Successfully retrieved list of countries
 *       500:
 *         description: Server error
 */
router.get('/countries', visitorController.listCountries);

/**
 * @swagger
 * /api/visitor/countries/{countryId}/categories/{categoryId}/arts:
 *   get:
 *     summary: List arts under a specific country and category
 *     description: Retrieves a list of arts under the specified country and category.
 *     tags:
 *       - Visitor
 *     parameters:
 *       - in: path
 *         name: countryId
 *         required: true
 *         description: The ID of the country
 *         schema:
 *           type: string
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved list of arts
 *       404:
 *         description: Country or category not found
 *       500:
 *         description: Server error
 */
router.get('/countries/:countryId/categories/:categoryId/arts', visitorController.listArtsByCountryAndCategory);

module.exports = router;
