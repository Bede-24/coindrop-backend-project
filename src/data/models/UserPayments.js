const mongoose = require('mongoose');
const Tokeniser = require('../../services/Tokeniser');
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
    }
}, { timestamps: true })
module.exports = mongoose.model('UserPayments', schema);