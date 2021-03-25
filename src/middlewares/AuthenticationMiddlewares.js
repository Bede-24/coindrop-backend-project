const User = require('../data/models/User');
const Admin = require('../data/models/Admin');
const BaseResponse = require('../services/BaseResponse');
const bcrypt = require("bcryptjs");
const Tokeniser = require('../services/Tokeniser');
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
    static async checkJWT(req, res, next) {
        if (!req.get("Authorization") || !req.get("Authorization").startsWith("Bearer ")) return BaseResponse(res).error(400, 'JWT was not provided.');
        const token = req.get("Authorization").split(" ")[1];
        const tokenObj = Tokeniser.decodeToken(token);
        if (!tokenObj) return BaseResponse(res).error(400, 'Invalid JWT.', true, { login: true });
        const user = await User.findOne({ _id: tokenObj._id })
        if (!user) return BaseResponse(res).error(404, 'A user with this ID was not found.', true, { login: true });
        next();
    }
    static async checkAdminJWT(req, res, next) {
        if (!req.get("Authorization") || !req.get("Authorization").startsWith("Bearer ")) return BaseResponse(res).error(400, 'JWT was not provided.');
        const token = req.get("Authorization").split(" ")[1];
        console.log(token);
        const tokenObj = Tokeniser.decodeToken(token);
        if (!tokenObj) return BaseResponse(res).error(400, 'Invalid JWT.', false, { login: true });
        const user = await Admin.findOne({ _id: tokenObj._id });
        if (!user) return BaseResponse(res).error(404, 'A user with this ID was not found.', true, { login: true });
        next();
    }
    static async checkIfIdMatchesJWTId(req, res, next) {
        const { id } = req.params;
        const token = req.get("Authorization").split(" ")[1];
        const tokenObj = Tokeniser.decodeToken(token);
        if (id !== tokenObj._id) return BaseResponse(res).error(401, 'You are not allowed to view this user\'s information.');
        next();
    }
}