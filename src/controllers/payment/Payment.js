const User = require('../../data/models/User');
const UserPayment = require('../../data/models/UserPayments');
const BaseResponse = require('../../services/BaseResponse');
module.exports = class Payment {
    static async userClaimsPayment(req, res) {
        const {id, upgradeType, cryptoPlatform} = req.body;
        const user = await User.findOne({_id: id});
        if(!user) return BaseResponse(res).error(404, 'A user with this ID was not found.', true, { login: true });
        const payment = new UserPayment({userId: id, upgradeType, cryptoPlatform})
        await payment.save().catch(err => {
            console.log(err)
            return BaseResponse(res).error(404, 'Something went wrong try it again.');
        }).finally(() => {
            // email goes here.
            return BaseResponse(res).success(200, 'Your payment would be verified shortly.')
        })
    }
}