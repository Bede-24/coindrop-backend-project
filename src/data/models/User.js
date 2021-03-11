const mongoose = require('mongoose');
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
        type: Number
    },
    hashRate: {
        type: Number
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: "you must provide an email",
        unique: true,
        validate: {
            validator: (value) =>
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
                    value
                ),
            message: "You must provide a valid email",
        },
    },
    cryptoAddressPlatform: {
        type: String,
        required: "you must provide a platform"
    },
    password: {
        type: String,
        required: 'You must provide a password with min length of 8'
    },
    passwordResetToken: { type: String },
    refEmail: {
        type: String,
        validate: {
            validator: (value) =>
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
                    value
                ),
            message: "You must provide a valid email",
        },
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
schema.methods.getUser = () => {
    const user = this.toObject();
    delete user.password;
    delete user.verificationToken;
    delete user.verificationTokenExpiresAt;
    delete user.passwordResetExpiresAt;
    delete user.passwordResetToken;
}
module.exports = mongoose.model('User', schema);