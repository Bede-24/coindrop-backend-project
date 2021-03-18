const UserPayments = require('../../data/models/HashRateIncrease')
const User = require('../../data/models/User')
const BaseResponse = require('../../services/BaseResponse')
const PaymentRequest = require('../../data/models/PaymentRequest');
module.exports = class Payments {
    /***
     * Get all user's payment's.
     */
    static async getUserPayments(req, res) {
        const status = req.params.status;
        let searchParams;
        if (status === 'all') {
            searchParams = {}
        } else searchParams = { status }
        const payments = await UserPayments.find(searchParams);
        return BaseResponse(res).success(200, 'User payments fetched successfully', payments, true);
    }
    static async increaseUserHashRate(req, res) {
        const { newHashRate, userId } = req.body;
        if (!newHashRate || typeof newHashRate !== Number) return BaseResponse(res).error(400, 'Invalid hash rate. hash rate has to be a number');
        const user = await User.findOne({ _id: userId })
        if (!user) return BaseResponse(res).error(404, 'This user was not found');
        user.hashRate = newHashRate;
        user.status = 'confirmed';
        user.save();
        const data = user.getUser();
        return BaseResponse(res).success(200, 'User\'s hash rate has been updated successfully.', data)
    }
    static async declineHashRateRequest(req, res) {
        const { reason, hashRequestId } = req.body;
        if (!reason) return BaseResponse(res).error(400, 'Reason for declining increase request was not provided.');
        const request = await UserPayments.findOne({ _id: hashRequestId });
        if (!request) return BaseResponse(res).error(404, 'This request was not found');
        request.status = 'declined';
        request.reason = reason;
        request.save();
        return BaseResponse(res).success(200, 'User\'s hash rate has been updated successfully.', request);
    }
    static async getWithdrawalRequests(req, res) {
        const status = req.params.status;
        let searchParams;
        if (status === 'all') {
            searchParams = {}
        } else searchParams = { status }
        const requests = await PaymentRequest.find(searchParams);
        return BaseResponse(res).success(200, 'Withdrawal Requests fetched.', requests, true);
    }
    static async changeWithdrawalRequestStatus(req, res) {
        // status = ["pending", "completed", "declined"]
        const { id, status, reason } = req.body;
        if (!status) return BaseResponse(res).error(400, 'Status was not sent.');
        if (status === 'declined') {
            if (!reason) return BaseResponse(res).error(400, 'If request was declined, there should be a reason.');
        }
        const request = await PaymentRequest.findOne({ _id: id });
        if (!request) return BaseResponse(res).error(400, 'Request does not exist');
        request.status = status;
        reason.reason = reason || '';
        request.save();
        return BaseResponse(res).success(200, 'Payment request status has been changed.');
    }
}