const NotificationSchema = require("../../data/models/Notifications");
const AdminNotificationSchema = require("../../data/models/AdminNotifications");
const { pubnub } = require("../../services/provider");
const baseResponse = require('../../services/BaseResponse');
module.exports = class Notifications {
    static async sendNotification({ userId, text, header, action, nextRoute }) {
        const notification = new NotificationSchema({ userId, text, header, action: action || '', nextRoute: nextRoute || '' });
        await notification.save();
        pubnub.publish({
            message: notification,
            channel: `notifications-${userId}`,
        });
    }
    static async sendAdminNotification({ text, header }) {
        const notification = new AdminNotificationSchema({ text, header });
        await notification.save();
        pubnub.publish({
            message: notification,
            channel: `notifications-admin`,
        });
    }
    static async getNotifications(req, res) {
        const { id } = req.params;
        const notifications = await NotificationSchema.find({ userId: id });
        return baseResponse(res).success(200, "Notifications fetched successfully", notifications, true);
    }
}