const mongoose = require('mongoose');
const Tokeniser = require('../../services/Tokeniser');
const schema = new mongoose.Schema({
    documentUrl: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    },
    taxHeadline: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    taxBody: {
        type: String,
        required: true
    }
}, { timestamps: true });
module.exports = mongoose.model('Taxes', schema);