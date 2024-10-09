const mongoose = require('mongoose');  // Importing mongoose to define schema
const Schema = mongoose.Schema;        // Mongoose schema class

// Base User Schema: Common for all user types (Admin, RegisteredUser, Artiste)
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    
    // Define relationships for messages (sent/received)
    receivedMessages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    sentMessages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});



// RegisteredUser extends User
const registeredUserSchema = userSchema.clone();  // Cloning base schema to extend
registeredUserSchema.add({
    walletBalance: { type: Number, default: 0 },  // Adding wallet balance for RegisteredUser
    purchases: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }],  // Purchases made by user
    purchasedArts: [{ type: Schema.Types.ObjectId, ref: 'Art' }]    // List of purchased arts
});



// Artiste extends RegisteredUser
const artisteSchema = registeredUserSchema.clone();
artisteSchema.add({
    arts: [{ type: Schema.Types.ObjectId, ref: 'Art' }],             // Arts created by the artist
    collaborations: [{ type: Schema.Types.ObjectId, ref: 'Collaboration' }], // Collaboration projects
    isMembershipPaid: { type: Boolean, default: false },             // Membership status
    membershipExpiry: { type: Date },                                // Membership expiry date
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }] // Notifications for the artist
});



// Admin extends Base User (extra privileges)
const adminSchema = userSchema.clone();
adminSchema.add({
    artApprovals: [{ type: Schema.Types.ObjectId, ref: 'Art' }] // Approved art list
});



// Creating model instances
const User = mongoose.model('User', userSchema);
const RegisteredUser = mongoose.model('RegisteredUser', registeredUserSchema);
const Artiste = mongoose.model('Artiste', artisteSchema);
const Admin = mongoose.model('Admin', adminSchema);

module.exports = { User, RegisteredUser, Artiste, Admin };
