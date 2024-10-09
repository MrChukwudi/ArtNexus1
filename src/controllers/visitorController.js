const VisitorService = require('../services/visitorService');

// Controller to list all countries
exports.listCountries = async (req, res) => {
    try {
        const countries = await VisitorService.getAllCountries(); // Call service function
        return res.status(200).json({ message: 'Countries retrieved successfully', countries });
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving countries', error: error.message });
    }
};

// Controller to list all arts under a country and category
exports.listArtsByCountryAndCategory = async (req, res) => {
    try {
        const { countryId, categoryId } = req.params; // Extract parameters from the URL
        const arts = await VisitorService.getArtsByCountryAndCategory(countryId, categoryId); // Call service function
        return res.status(200).json({ message: 'Arts retrieved successfully', arts });
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving arts', error: error.message });
    }
};
