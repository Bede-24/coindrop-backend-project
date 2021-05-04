const UserSchema = require('../../data/models/User')
const BaseResponse = require('../../services/BaseResponse')
module.exports = class User {
    static async getUserProfile(req, res) {
        const { id } = req.params;
        if (!id) return BaseResponse(res).error(400, 'User Id was not provided', false, { login: true });
        const user = await UserSchema.findOne({ _id: id });
        if (!user) return BaseResponse(res).error(400, 'User was not found', false, { login: true });
        const data = user.getUser();

        return BaseResponse(res).success(200, 'User fetched successfully', data, true);
    }

    static async updateProfile(req, res) {
        const { id } = req.params;
        const { avatar, SSN, address, country, state, dateOfBirth, fullName } = req.body;
        console.log({ avatar, SSN, address, country, state, dateOfBirth, fullName })
        if(!avatar && !SSN && !address && !country && !state && !dateOfBirth && !fullName ) return BaseResponse(res).error(400, 'You must provide a value to be edited.');
        const user = await UserSchema.findOne({ _id: id });
        if (avatar) user.avatar = avatar;
        if (SSN) user.ssn= SSN;
        if (address) user.address = address;
        if (country) user.country = country;
        if (state) user.state = state;
        if (dateOfBirth) user.dateOfBirth = dateOfBirth;
        if (fullName) user.fullName = fullName;
        user.save();
        return BaseResponse(res).success(200, 'Your profile has been edited successfully');
    }
}