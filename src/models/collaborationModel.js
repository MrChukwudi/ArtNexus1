const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Collaboration Schema: (real-time messaging between artistes)
const collaborationSchema = new Schema({
    projectName: { type: String, required: true }, // Name of the collaboration project
    description: { type: String, required: true }, // Project description
    skillsRequired: [{ type: String, required: true }], // Required skills for the collaboration
    numberOfCollaborators: { type: Number, required: true },
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Artists involved in collaboration
    createdAt: { type: Date, default: Date.now }, // Collaboration start date
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Owner of the collaboration project
});

const Collaboration = mongoose.model('Collaboration', collaborationSchema);
module.exports = Collaboration;
