const BaseResponse = require('../../services/BaseResponse');
const User = require('../../data/models/User');
module.exports = class Mining {
    static async increaseUsersBalanceByHashRate(req, res)  {
        const users = await User.find({ isBlocked: false })
        users.map(async (user) => {
            user.balance = user.balance + user.hashRate;
            await user.save();
            console.log(user);
        });
        return BaseResponse(res).success(200, 'User\'s hash rate updated successfully.')
    }
}