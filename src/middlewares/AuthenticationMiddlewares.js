const User = require('../data/models/User');
const BaseResponse = require('../services/BaseResponse')
const bcrypt = require("bcryptjs");
module.exports = class AuthenticationMiddlewares {
    static async checkIfUserAlreadyExists(req, res, next) {
        const email = req.body.email, password = req.body.password;

        if (!password) {
            return BaseResponse(res).error(400, 'Password was not provided.')
        }
        const user = await User.findOne({ email });
        if (user) {
            return BaseResponse(res).error(400, 'A user with this email address exists in our database')
        }
        else next();
    }
    static async loginCheck(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return BaseResponse(res).error(404, 'This user does not exist in our database. try registering.')
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) return BaseResponse(res).error(404, 'This password does not match this user.')
        else {
            next();
        }
    }
}