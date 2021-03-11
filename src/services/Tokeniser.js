const jwt = require('jsonwebtoken');
const { JWT_ISSUER, JWT_SECRET } = require("../config/secrets");
const jwtOptions = {
    expiresIn: "2d",
    issuer: JWT_ISSUER,
};
module.exports = class Tokeniser {
    static createToken(payload) {
        const token = jwt.sign(payload, JWT_SECRET, jwtOptions)
        return token;
    }
    static verifyToken(token) {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded
    }
}