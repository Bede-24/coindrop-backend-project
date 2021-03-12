const mongoose = require('mongoose');
const Tokeniser = require('../../services/Tokeniser');
const schema = new mongoose.Schema({
    avatar: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    JWT: {
        type: String
    },
    balance: {
        type: Number,
        default: 0
    },
    hashRate: {
        type: Number,
        default: 2
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: "you must provide an email",
        unique: true,
    },
    cryptoAddressPlatform: {
        type: String
    },
    cryptoAddress: {
        type: String
    },
    password: {
        type: String,
        required: 'You must provide a password with min length of 8'
    },
    passwordResetToken: { type: String },
    refEmail: {
        type: String
    },
    passwordResetExpiresAt: { type: String },
    verificationToken: { type: String },
    verificationTokenExpiresAt: { type: String, default: '' }
}, { timestamps: true })
schema.methods.block = () => {
    this.isBlocked = true;
}
schema.methods.unBlock = () => {
    this.isBlocked = true;
}
schema.methods.getUser = function () {
    const user = this.toJSON();
    delete user.password;
    delete user.verificationToken;
    delete user.verificationTokenExpiresAt;
    delete user.passwordResetExpiresAt;
    delete user.passwordResetToken;
    return user;

}
schema.methods.generateJWT = function () {
    const user = this.toJSON();
    const tokenObject = {
        _id: user._id
    }
    this.JWT = Tokeniser.createToken(tokenObject);
}
module.exports = mongoose.model('User', schema);