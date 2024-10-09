const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Message Schema for communication between users
const messageSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Participants in the message (sender, receiver)
    dateCreated: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    messages: [{
        senderId: { type: Schema.Types.ObjectId, ref: 'User' },  // Sender of the message
        messageBody: { type: String, required: true }, // Content of the message
        timestamp: { type: Date, default: Date.now },  // Timestamp when the message was sent
    }],
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
