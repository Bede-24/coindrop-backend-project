const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    id: {
        type: String
    },
    user: {
        type: Object
    }
}, { timestamps: true })
module.exports = mongoose.model('Verifications', schema);