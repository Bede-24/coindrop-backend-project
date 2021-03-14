const UsersModel = require('../../data/models/User');
const BaseResponse = require('../../services/BaseResponse')
module.exports = class Users {
    static async deleteAllUsers() {
        await UsersModel.deleteMany({});
        console.log('All users have been deleted.')
        return true;
    }
    static async getAllUsers() {
        const users = await UsersModel.find({});
        console.log(users);
    }
    static async getUser(req, res) {
        const { id } = req.body;
        if (!id) return BaseResponse(res).error(400, 'User ID was not provided.')
        const user = await UsersModel.findOne({ _id: id });
        if (!user) return BaseResponse(res).error(404, 'User not found.')
        const data = user.getUser();
        return BaseResponse(res).success(200, 'User fetched successfully', data, true);
    }
}