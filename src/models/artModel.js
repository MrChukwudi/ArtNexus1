const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Art Schema (created by an artiste)
const artSchema = new Schema({
    title: { type: String, required: true }, // Title of the art
    price: { type: Number, required: true }, // Price for purchasing
    description: { type: String, maxlength: 500 },
    createdDate: { type: Date, default: Date.now },
    artTypeId: { type: Schema.Types.ObjectId, ref: 'ArtType' },  // Type of art (e.g., Media, Exhibition)
    artisteID: { type: Schema.Types.ObjectId, ref: 'Artiste' },  // Artiste who created the art
    countryId: { type: Schema.Types.ObjectId, ref: 'Country' },  // Country of the art
    isApproved: { type: Boolean, default: false },               // Approval status
    purchases: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }], // Purchases related to this art
    isAvailableForPurchase: { type: Boolean, default: true },    // Art purchase availability
});

// Creating the Art model
const Art = mongoose.model('Art', artSchema);
module.exports = Art;
