const User = require("../../data/models/User");
const BaseResponse = require('../../services/BaseResponse');
module.exports = class Referrals {
    static async getRefferals(req, res) {
        const { email } = req.params;
        if (!email) return BaseResponse(res).error(400, 'Email was not provided.');
        const users = await User.find({ refEmail: email });
        const userArr = [];
        users.forEach(user => {
            userArr.push(user.getUser());
        })
        return BaseResponse(res).success(200, 'Referrals have been provided successfully', userArr, true);
    }
}
