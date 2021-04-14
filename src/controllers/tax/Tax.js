const Taxes = require("../../data/models/Taxes");
const BaseResponse = require("../../services/BaseResponse");
const Notifications = require('../notifications/Notifications');
const User = require('../../data/models/User');
module.exports = class Tax {
    static async getTaxDetails(req, res) {
        const { id } = req.params;
        if (!id) return BaseResponse(res).error(400, "Tax ID was not provided.");
        const tax = await Taxes.findOne({ _id: id });
        if (!tax) return BaseResponse(res).errorr(404, "Tax was not found.");
        return BaseResponse(res).success(200, 'Tax fetched successfully', tax, true);
    }
    static async userClaimsTaxPayment(req, res) {
        const { userId, taxId, } = req.body;
        const user = await User.findOne({ _id: userId });
        if (!user) return BaseResponse(res).error(404, 'A user with this ID was not found.', true, { login: true });
        const tax = await Taxes.findOne({ _id: taxId });
        if (!tax) return BaseResponse(res).error(404, 'This tax does not exist.');
        tax.completed = true;
        await tax.save();
        Notifications.sendAdminNotification({ text: `${user.email} just claimed that a tax transaction .`, header: "User claims payment" })
        return BaseResponse(res).success(200, 'Your payment would be verified shortly.');
    }
}