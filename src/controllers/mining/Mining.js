const mongoose = require('mongoose');
const User = require('../../data/models/User');
module.exports = class Mining {
    static async increaseUsersBalanceByHashRate() {
        const users = await User.find({ isBlocked: false })
        users.map(async (user) => {
            user.balance = user.balance + user.hashRate;
            await user.save();
        })
    }
}