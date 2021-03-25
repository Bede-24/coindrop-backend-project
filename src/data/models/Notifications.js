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
        required: "You need to provide notification's text"
    },
    header: {
        type: String,
        required: "You need to provide notification's header"
    },
    userId: {
        type: String,
        required: "you have to provide user's ID",
    },
    nextRoute: {
        type: String
    }
}, { timestamps: true })
module.exports = mongoose.model('UserNotifications', schema);