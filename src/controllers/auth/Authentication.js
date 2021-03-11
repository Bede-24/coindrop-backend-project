const User = require('../../data/models/User')
const BaseResponse = require('../../services/BaseResponse');
const hasher = require('../../services/hasher');
module.exports = class Authentication {
    static async register(req, res) {
        const { email, password, refEmail } = req.body;
        const hashedPassword = hasher(email, password).hash;
        const user = new User({ email, password: hashedPassword, refEmail });
        user.generateJWT();
        await user.save();
        const userObj = user.getUser();
        return BaseResponse(res).success(200, 'User created successfully', userObj);
    }
    static async login(req, res) {
        const { email, password } = req.body;
        const user = new User({ email, password, refEmail });
        user.generateJWT();
        await user.save();
        const userObj = user.getUser();
        return BaseResponse(res).success(200, 'User created successfully', userObj);
    }
}