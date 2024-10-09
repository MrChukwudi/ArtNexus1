const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ArtType Schema (categories of art like Literature, Media)
const artTypeSchema = new Schema({
    name: { type: String, required: true },
    arts: [{ type: Schema.Types.ObjectId, ref: 'Art' }]  // List of arts under this type
});

const ArtType = mongoose.model('ArtType', artTypeSchema);
module.exports = ArtType;
