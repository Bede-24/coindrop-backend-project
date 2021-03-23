const NotificationSchema = require("../../data/models/Notifications");
const AdminNotificationSchema = require("../../data/models/AdminNotifications");
const BaseResponse = require("../../services/BaseResponse");
module.exports = class Notifications {
    static async sendNotification({ userId, text, header, action, nextRoute }) {
        const notification = new NotificationSchema({ userId, text, header, action, nextRoute });
        await notification.save();
    }
    static async sendAdminNotification({ userId, text, header, action, nextRoute }) {
        const notification = new AdminNotificationSchema({ userId, text, header, action, nextRoute });
        await notification.save();
        console.log(notification);
    }
}