const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    JWT: {
        type: String
    }
}, { timestamps: true })
schema.methods.generateJWT = function () {
    const user = this.toJSON();
    const tokenObject = {
        _id: user._id,
        email: user.email
    };
    this.JWT = Tokeniser.createToken(tokenObject);
}
module.exports = mongoose.model('Admin', schema);