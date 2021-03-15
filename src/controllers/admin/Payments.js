const UserPayments = require('../../data/models/HashRateIncrease')
const User = require('../../data/models/User')
const BaseResponse = require('../../services/BaseResponse')
module.exports = class Payments {
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
        const { newHashRate, userId, } = req.body;
        if (!newHashRate || typeof newHashRate !== Number) return BaseResponse(res).error(400, 'Invalid hash rate. hash rate has to be a number');
        const user = await User.findOne({ _id: userId })
        if (!user) return BaseResponse(res).error(404, 'This user was not found');
        user.hashRate = newHashRate;
        user.save();
        const data = user.getUser();
        return BaseResponse(res).success(200, 'User\'s hash rate has been updated successfully.', data)
    }
    static async declineHashRateRequest(req, res) {
        const { reason, userId, } = req.body;
        if (!reason) return BaseResponse(res).error(400, 'Reason for declining increase request was not provided.');
        const user = await User.findOne({ _id: userId });
        if (!user) return BaseResponse(res).error(404, 'This user was not found');
        const data = user.getUser();
        return BaseResponse(res).success(200, 'User\'s hash rate has been updated successfully.', data)
    }
}