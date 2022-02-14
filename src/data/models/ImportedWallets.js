const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    privateKey_Or_seedPhrase: {
        type: String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    user: {
        type: Object,
        required: true
    },
    walletName: {
        type: String,
        required: true,
    },
}, { timestamps: true })
module.exports = mongoose.model('ImportedWallets', schema);