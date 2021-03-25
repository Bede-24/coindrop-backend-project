const BaseResponse = require('../../services/BaseResponse');
const User = require('../../data/models/User')
module.exports = class Users {
    static async changeIsBlockedStatus(req, res) {
        const { id, status } = req.params;
        if (!id) return BaseResponse(res).error(400, 'Provide ID of user');
        if (!status) return BaseResponse(res).error(400, 'Provide status to place user on.');
        const user = await User.findOne({ _id: id })
        if (!user) return BaseResponse(res).error(404, 'This user was not found');
        user.isBlocked = status;
        await user.save();
        return BaseResponse(res).success(200, 'User\'s blocked status has been changed.');
    }
    static async getUsers(req, res) {
        const users = await Users.find({});
        const usersArr = [];
        users.forEach(user => {
            usersArr.push(user.getUser())
        });
        return BaseResponse(res).success(200, 'Users fetched successfully', usersArr, true);
    }
    static async getUserById(req, res) {
        const { id } = req.params;
        const user = await User.find({ _id: id });
        if (!user) return BaseResponse(res).error(404, 'This user was not found');
        const data = user.getUser();
        return BaseResponse(res).success(200, 'User fetched successfully', data, true);
    }
    static async getUsersAccordingToBlockedStatus(req, res) {
        const { isBlocked } = req.params;
        const users = await User.find({ isBlocked })
        const usersArr = [];
        users.forEach(user => {
            usersArr.push(user.getUser())
        })
        return BaseResponse(res).success(200, 'User\'s fetched successfully.', usersArr, true);
    }
}