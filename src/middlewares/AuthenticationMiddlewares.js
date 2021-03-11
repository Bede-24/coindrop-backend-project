const User = require('../data/models/User');
const BaseResponse = require('../services/BaseResponse')
module.exports = class AuthenticationMiddlewares {
    static async checkIfUserAlreadyExists(req, res, next) {
        const email = req.body.email, password = req.body.password
        if (!password) {
            return BaseResponse(res).error(400, 'Password was not provided.')
        }
        const user = await User.findOne({ email });
        console.log(user);
        if (user) {
            return BaseResponse(res).error(400, 'A user with this email address exists in our database')
        }
        else {
            console.log("next")
            next();
        }
    }
}