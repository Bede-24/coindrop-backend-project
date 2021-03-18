const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    upgradeType: {
        type: String,
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
    // ['pending', 'confirmed', 'declined']
    status: {
        type: String,
        default: 'pending'
    },
    reason: {
        type: String,
        default: ''
    },
    user: {
        type: Object,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
}, { timestamps: true })
module.exports = mongoose.model('UserPayments', schema);