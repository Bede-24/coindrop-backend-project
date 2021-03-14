const Admins = require('../../data/models/Admin')
module.exports = class Admins {
    static async deleteAllAdmins() {
        await Admins.deleteMany({});
        console.log('All admins have been deleted.');
    }
}