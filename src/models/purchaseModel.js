const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Purchase Schema (arts purchased by users)
const purchaseSchema = new Schema({
    purchaseDate: { type: Date, default: Date.now },
    registeredUserID: { type: Schema.Types.ObjectId, ref: 'RegisteredUser', required: true },
    artID: { type: Schema.Types.ObjectId, ref: 'Art', required: true },
    isApproved: { type: Boolean, default: false }  // Admin approval for the purchase
});

const Purchase = mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase;
