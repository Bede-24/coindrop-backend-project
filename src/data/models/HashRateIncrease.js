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
    cryptoPlatform: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    user: {
        type: Object,
        required: true
    }
}, { timestamps: true })
module.exports = mongoose.model('UserPayments', schema);