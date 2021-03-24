const User = require('../../data/models/User');
const BaseResponse = require('../../services/BaseResponse');
const bcrypt = require("bcryptjs");
const Notification = require("../notifications/Notifications");
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
        if (referral) {
            referral.noOfRefferals = referral.noOfRefferals + 1;
            await referral.save();
            Notification.sendNotification({ userId: referral._id, text: `Your referral ${user.email} just registered.`, header: "Referral Account Creation" });
        }
        const userObj = user.getUser();
        Notification.sendAdminNotification({ text: `${email} just registered. he was referred by ${refEmail || 'No one'}`, header: "Account Creation" });
        return BaseResponse(res).success(200, 'User created successfully', userObj);
    }
    static async login(req, res) {
        const { email } = req.body;
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