const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Country Schema (for art categories based on location)
const countrySchema = new Schema({
    countryName: { type: String, required: true },
    arts: [{ type: Schema.Types.ObjectId, ref: 'Art' }]  // Arts belonging to this country
});

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;
