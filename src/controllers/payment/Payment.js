const User = require('../../data/models/User');
const UserPayment = require('../../data/models/HashRateIncrease');
const PaymentRequest = require('../../data/models/PaymentRequest');
const BaseResponse = require('../../services/BaseResponse');
const Notifications = require('../notifications/Notifications');
module.exports = class Payment {
    static async userClaimsPayment(req, res) {
        const { amount, id, upgradeType, coin } = req.body;
        const user = await User.findOne({ _id: id });
        if (!upgradeType) return BaseResponse(res).error(400, 'Upgrade type was not provided.');
        if (!amount) return BaseResponse(res).error(400, 'Amount was not provided.');
        if (!coin) return BaseResponse(res).error(400, 'Coin was not provided.');
        if (!user) return BaseResponse(res).error(404, 'A user with this ID was not found.', true, { login: true });
        const data = await user.getUser();
        const payment = new UserPayment({upgradeType, coin, user: data, amount: `${amount}` });
        await payment.save().catch(err => {
            console.log(err)
            return BaseResponse(res).error(404, 'Something went wrong try it again.');
        }).finally(() => {
            // email goes here. 
            Notifications.sendAdminNotification({  text: `${user.email} just claimed that a transaction with the amount ${amount} was made.`, header: "User claims payment" })
            return BaseResponse(res).success(200, 'Your payment would be verified shortly.')
        })
    }
    static async getClaimedPayments(req, res) {
        const { id } = req.params;
        const requests = await UserPayment.find({ userId: id });
        return BaseResponse(res).success(200, 'Claimed payments fetched successfully.', requests, true);
    }
    static async getClaimedPayment(req, res) {
        const { id } = req.params;
        const claimedPayment = await UserPayment.findOne({ _id: id });
        if (!claimedPayment) return BaseResponse(res).error(404, 'Withdrawal request was not found');
        return BaseResponse(res).success(200, 'Claimed payment fetched successfully.', claimedPayment, true);
    }
    static async makeWithdrawalRequest(req, res) {
        const { amount, cryptoAddress, coin, userId } = req.body;
        const user = await User.findOne({ _id: userId });
        if (!user) return BaseResponse(res).error(400, 'User does not exist.', false, { login: true });
        if (user.balance < amount) return BaseResponse(res).error(400, 'Insufficient amount');
        if (user.minimumWithdrawal > amount) return BaseResponse(res).error(400, 'Cannot withdraw amount less than your minimum withdrawal');
        if (user.maximumWithdrawal < amount) return BaseResponse(res).error(400, 'Cannot withdraw amount more than your maximum withdrawal');
        const data = await user.getUser();
        const request = new PaymentRequest({ amount, cryptoAddress, coin, userId, user: data });
        request.save();
        Notifications.sendAdminNotification({text: `${user.email} just made a withdrawal request of ${amount}`, header: "User claims payment" })
        return BaseResponse(res).success(200, 'your withdrawal request has been saved and would be reviewed subsequently.')
    }
    static async getWithdrawalRequests(req, res) {
        const { id } = req.params;
        const requests = await PaymentRequest.find({ userId: id });
        return BaseResponse(res).success(200, 'Withdrawal requests fetched successfully.', requests, true);
    }
    static async getWithdrawalRequest(req, res) {
        const { id } = req.params;
        const request = await PaymentRequest.findOne({ _id: id });
        if (!request) return BaseResponse(res).error(404, 'Withdrawal request was not found');
        return BaseResponse(res).success(200, 'Withdrawal request fetched successfully.', request, true);
    }
}