const UserSchema = require('../../data/models/User')
const BaseResponse = require('../../services/BaseResponse')
module.exports = class User {
    static async getUserProfile(req, res) {
        const { id } = req.params;
        if (!id) return BaseResponse(res).error(400, 'User Id was not provided', false, { login: true });
        const user = await UserSchema.findOne({ _id: id });
        if(!user) return BaseResponse(res).error(400, 'User was not found', false, { login: true });
        const data = user.getUser();
     
       return BaseResponse(res).success(200, 'User fetched successfully', data, true);
    }

    static async getUserTax(req, res) {
        
    }
}