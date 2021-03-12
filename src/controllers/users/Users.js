const UsersModel = require('../../data/models/User');
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
}