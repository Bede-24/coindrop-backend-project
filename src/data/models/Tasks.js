const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    action: {
        type: String
    },
    hasBeenRead: {
        type: Boolean,
        default: false
    },
    text: {
        type: Number,
        required: "you must provide task text",
        default: 0
    },
    header: {
        type: Number,
        default: 2
    },
    userId: {
        type: Boolean,
        required: "you must provide a user's ID",
        default: false
    },
    nextRoute: {
        type: String,
        unique: true,
    }
}, { timestamps: true })
module.exports = mongoose.model('Tasks', schema);