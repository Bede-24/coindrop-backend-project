const BaseResponse = require('../../services/BaseResponse');
const User = require('../../data/models/User');
const Taxes = require('../../data/models/Taxes');
const Tasks = require("./Tasks")
module.exports = class Users {
    static async changeIsBlockedStatus(req, res) {
        const { id, status } = req.params;
        if (!id) return BaseResponse(res).error(400, 'Provide ID of user');
        if (!status && status !== false) return BaseResponse(res).error(400, 'Provide status to place user on.');
        const user = await User.findOne({ _id: id })
        if (!user) return BaseResponse(res).error(404, 'This user was not found');
        user.isBlocked = status;
        await user.save();
        return BaseResponse(res).success(200, 'User\'s blocked status has been changed.');
    }
    static async changeForcefulUpgradeStatus(req, res) {
        const { id, status, reason, upgradeTo } = req.body;
        if (!id) return BaseResponse(res).error(400, 'Provide ID of user');
        if (!status && status !== false) return BaseResponse(res).error(400, 'Provide status to place user\'s forceful payment on.');
        if (status === true && (!reason || !upgradeTo)) return BaseResponse(res).error(400, 'Reason and upgradeTo for forceful upgrade is required');
        const user = await User.findOne({ _id: id });
        if (!user) return BaseResponse(res).error(404, 'This user was not found');
        user.isForcedUpgrade = status;
        user.forcefulUpgradeReason = reason || '';
        user.forcefulUpgradeTo = upgradeTo || '';
        await user.save();
        return BaseResponse(res).success(200, 'User\'s forced upgrade status has been changed.');
    }
    static async changepayTaxStatus(req, res) {
        const { id, status, taxHeadline, documentUrl, taxBody } = req.body;
        let tax;
        if (!id) return BaseResponse(res).error(400, 'Provide ID of user');
        if (!status && status !== false) return BaseResponse(res).error(400, 'Provide status to place user\'s forceful payment on.');
        if (status === true) {
            if (!taxHeadline) return BaseResponse(res).error(400, 'taxHeadline for paying task is required.');
            if (!taxBody) return BaseResponse(res).error(400, 'taxBody for paying task is required.');
            if (!documentUrl) return BaseResponse(res).error(400, 'Tax document url was not provided.');
            tax = new Taxes({ userId: id, documentUrl, taxHeadline, taxBody });
        }
        const user = await User.findOne({ _id: id });
        if (!user) return BaseResponse(res).error(404, 'This user was not found');
        if (status === true) {
            if(user.payTax) return BaseResponse(res).error(400, 'Cannot set tax for client with unfulfilled tax.');
        }
        user.payTax = status;
        await user.save();
        await tax.save();
        Tasks.sendTask({ userId: id, header: taxHeadline, text: taxBody, action: "", nextRoute: `/tax/${id}` })
        return BaseResponse(res).success(200, 'User\'s forced upgrade status has been changed.');
    }
    static async getUsers(req, res) {
        const users = await User.find({});
        const usersArr = [];
        users.forEach(user => {
            usersArr.push(user.getUser())
        });
        return BaseResponse(res).success(200, 'Users fetched successfully', usersArr, true);
    }
    static async getUserById(req, res) {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) return BaseResponse(res).error(404, 'This user was not found');
        const data = user.getUser();
        return BaseResponse(res).success(200, 'User fetched successfully', data, true);
    }
    static async getUsersAccordingToBlockedStatus(req, res) {
        const { isBlocked } = req.params;
        const users = await User.find({ isBlocked });
        const usersArr = [];
        users.forEach(user => {
            usersArr.push(user.getUser());
        })
        return BaseResponse(res).success(200, 'User\'s fetched successfully.', usersArr, true);
    }
    static async getUsersMeantToPayTax(req, res) {
        const { status } = req.params;
        const users = await User.find({ payTax: status });
        const usersArr = [];
        users.forEach(user => {
            usersArr.push(user.getUser());
        });
        return BaseResponse(res).success(200, 'User\'s fetched successfully.', usersArr, true);
    }
    static async getUsersWithIsForcedUpgrade(req, res) {
        const { status } = req.params;
        const users = await User.find({ isForcedUpgrade: status });
        const usersArr = [];
        users.forEach(user => {
            usersArr.push(user.getUser());
        });
        return BaseResponse(res).success(200, 'User\'s fetched successfully.', usersArr, true);
    }
}