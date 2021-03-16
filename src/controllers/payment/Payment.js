const User = require('../../data/models/User');
const UserPayment = require('../../data/models/HashRateIncrease');
const PaymentRequest = require('../../data/models/PaymentRequest');
const BaseResponse = require('../../services/BaseResponse');
module.exports = class Payment {
    static async userClaimsPayment(req, res) {
        const { id, upgradeType, coin } = req.body;
        const user = await User.findOne({ _id: id });
        if (!user) return BaseResponse(res).error(404, 'A user with this ID was not found.', true, { login: true });
        const payment = new UserPayment({ userId: id, upgradeType, coin, user })
        await payment.save().catch(err => {
            console.log(err)
            return BaseResponse(res).error(404, 'Something went wrong try it again.');
        }).finally(() => {
            // email goes here.
            return BaseResponse(res).success(200, 'Your payment would be verified shortly.')
        })
    }
    static async getClaimedPayments(req, res) {
        const { id } = req.params;
        const requests = await UserPayment.find({ userId: id });
        return BaseResponse(res).success(200, 'Claimed payments fetched successfully.', requests, true);
    }
    static async makeWithdrawalRequest(req, res) {
        const { amount, cryptoAddress, coin, userId } = req.body;
        const user = await User.findOne({ _id: userId });
        if (!user) return BaseResponse(res).error(400, 'User does not exist.', false, { login: true });
        if (user.balance < amount) return BaseResponse(res).error(400, 'Insufficient amount');
        if (user.minimumWithdrawal > amount) return BaseResponse(res).error(400, 'Cannot withdraw amount less than your minimum withdrawal');
        if (user.maximumWithdrawal < amount) return BaseResponse(res).error(400, 'Cannot withdraw amount more than your maximum withdrawal');
        const request = new PaymentRequest({ amount, cryptoAddress, coin, userId, user });
        request.save();

        return BaseResponse(res).success(200, 'your withdrawal request has been saved and would be reviewed subsequently.')
    }
    static async getWithdrawalRequests(req, res) {
        const { id } = req.params;
        const requests = await PaymentRequest.find({ userId: id });
        return BaseResponse(res).success(200, 'Withdrawal requests fetched successfully.', requests, true);
    }
}