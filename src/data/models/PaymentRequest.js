const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    user: {
        type: Object,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    coin: {
        type: String,
        required: true
    },
    cryptoAddress: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: 'Pending'
    }
}, { timestamps: true })
module.exports = mongoose.model('PaymentsRequest', schema);