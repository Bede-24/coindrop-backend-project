const User = require('../../data/models/User');
const BaseResponse = require('../../services/BaseResponse');
const bcrypt = require("bcryptjs");
module.exports = class Authentication {
    static async register(req, res) {
        const { email, password, refEmail } = req.body;
        let referral;
        if (refEmail) {
            referral = await User.findOne({ email: refEmail });
            if (!referral) return BaseResponse(res).error(400, 'Your referral is not a user on our platform.');
        }
        const hashedPassword = bcrypt.hashSync(password);
        const user = new User({ email, password: hashedPassword, refEmail });
        user.generateJWT();
        await user.save();
        if (refEmail) {
            referral.noOfRefferals = referral.noOfRefferals + 1;
            await referral.save();
        }
        const userObj = user.getUser();
        return BaseResponse(res).success(200, 'User created successfully', userObj);
    }
    static async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        user.generateJWT();
        await user.save().catch(e => {
            return BaseResponse(res).error(500, 'Something went wrong.')
        });
        const userObj = user.getUser();
        return BaseResponse(res).success(200,
            'User logged in successfully',
            userObj);
    }
}