const mongoose = require('mongoose');
const schema = new mongoose.Schema({
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
}, { timestamps: true })
module.exports = mongoose.model('AdminNotifications', schema);