const NotificationSchema = require("../../data/models/Notifications");
const AdminNotificationSchema = require("../../data/models/AdminNotifications");
const { pubnub } = require("../../services/provider")
module.exports = class Notifications {
    static async sendNotification({ userId, text, header, action, nextRoute }) {
        const notification = new NotificationSchema({ userId, text, header, action: action || '', nextRoute: nextRoute || '' });
        await notification.save();
        pubnub.publish({
            message: notification,
            channel: `notifications-${userId}`,
        });
    }
    static async sendAdminNotification({ userId, text, header, action, nextRoute }) {
        const notification = new AdminNotificationSchema({ text, header });
        await notification.save();
        pubnub.publish({
            message: notification,
            channel: `notifications-admin`,
        });
    }
}