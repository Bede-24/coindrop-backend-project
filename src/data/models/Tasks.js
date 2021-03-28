const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    action: {
        type: String
    },
    text: {
        type: String,
        required: "you must provide task text",
        default: 0
    },
    header: {
        type: String,
        default: 2
    },
    userId: {
        type: String,
        required: "you must provide a user's ID"
    },
    nextRoute: {
        type: String
    }
}, { timestamps: true })
module.exports = mongoose.model('Tasks', schema);