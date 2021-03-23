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
        type: String,
        required: "You need to provide notification's text",
        default: 0
    },
    header: {
        type: String,
        required: "You need to provide notification's header",
        default: 2
    },
    userId: {
        type: String,
        required: "you have to provide user's ID",
        default: false
    },
    nextRoute: {
        type: String,
        unique: true,
    }
}, { timestamps: true })
module.exports = mongoose.model('Notifications', schema);