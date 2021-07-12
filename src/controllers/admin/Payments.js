const UserPayments = require("../../data/models/HashRateIncrease");
const User = require("../../data/models/User");
const BaseResponse = require("../../services/BaseResponse");
const PaymentRequest = require("../../data/models/PaymentRequest");
const Notification = require("../notifications/Notifications");
module.exports = class Payments {
  /***
   * Get all user's payment's.
   */
  static async getUserPayments(req, res) {
    const status = req.params.status;
    let searchParams;
    if (status === "all") {
      searchParams = {};
    } else searchParams = { status };
    const payments = await UserPayments.find(searchParams);
    return BaseResponse(res).success(
      200,
      "User payments fetched successfully",
      payments,
      true
    );
  }

  static async increaseUserHashRate(req, res) {
    const { newHashRate, userId } = req.body;
//     if (!newHashRate || typeof newHashRate !== "number")
//       return BaseResponse(res).error(
//         400,
//         "Invalid hash rate. hash rate has to be a number"
//       )
    const user = await User.findOne({ _id: userId });
    if (!user) return BaseResponse(res).error(404, "This user was not found");
    user.hashRate = newHashRate;
    await user.save();
    const data = user.getUser();
    console.log(user, "increase hash rate");
    Notification.sendNotification({
      userId,
      text: `Your hash rate has been increased to ${newHashRate}`,
      header: "Hash Rate Increase",
    });
    return BaseResponse(res).success(
      200,
      "User's hash rate has been updated successfully.",
      data
    );
  }
  static async confirmPayment(req, res) {
    // maximumWithdrawal,
    const { newHashRate, upgradeTo, userId, hashRequestId, minimumWithdrawal } =
      req.body;
    if (!newHashRate || typeof newHashRate !== "number")
      return BaseResponse(res).error(
        400,
        "Invalid hash rate. hash rate has to be a number"
      );
    if (!userId || !minimumWithdrawal || !hashRequestId)
      return BaseResponse(res).error(
        400,
        "userId , hashRequestId, minimumWithdrawal are compulsory fields."
      );
    const user = await User.findOne({ _id: userId });
    if (!user) return BaseResponse(res).error(404, "This user was not found");
    let hashRequest;
    if (hashRequestId) {
      hashRequest = await UserPayments.findOne({ _id: hashRequestId });
      if (!hashRequest)
        return BaseResponse(res).error(
          404,
          "This hash rate request was not found"
        );
      hashRequest.status = "confirmed";
    }
    user.hashRate = newHashRate;
    user.minimumWithdrawal = minimumWithdrawal;
    user.currentPlan = upgradeTo;
    // user.maximumWithdrawal = maximumWithdrawal;
    await hashRequest.save();
    await user.save();
    console.log(user, "confirm payment");
    const data = user.getUser();
    Notification.sendNotification({
      userId,
      text: `Your payment has been confirmed`,
      header: "Payment confirmed",
    });
    Notification.sendNotification({
      userId,
      text: `Your hash rate has been increased to ${newHashRate}`,
      header: "Hash Rate Increase",
    });
    return BaseResponse(res).success(
      200,
      "User's hash rate has been updated successfully.",
      data
    );
  }
  static async declineHashRateRequest(req, res) {
    const { reason, hashRequestId, userId } = req.body;
    if (!reason)
      return BaseResponse(res).error(
        400,
        "Reason for declining increase request was not provided."
      );
    const request = await UserPayments.findOne({ _id: hashRequestId });
    if (!request)
      return BaseResponse(res).error(
        404,
        "This hash rate request was not found"
      );
    request.status = "declined";
    request.reason = reason;
    request.save();
    Notification.sendNotification({
      userId,
      text: `Your hash rate request was declined because ${reason}`,
      header: "Hash Rate Rejection",
    });
    return BaseResponse(res).success(
      200,
      "User's hash rate has been updated successfully.",
      request
    );
  }
  static async getWithdrawalRequests(req, res) {
    const status = req.params.status;
    let searchParams;
    if (status === "all") {
      searchParams = {};
    } else searchParams = { status };
    const requests = await PaymentRequest.find(searchParams);
    return BaseResponse(res).success(
      200,
      "Withdrawal Requests fetched.",
      requests,
      true
    );
  }
  static async changeWithdrawalRequestStatus(req, res) {
    // status = ["pending", "completed", "declined"]
    const { id, status, reason } = req.body;
    if (!status) return BaseResponse(res).error(400, "Status was not sent.");
    if (status === "declined" && !reason)
      return BaseResponse(res).error(
        400,
        "If request was declined, there should be a reason."
      );

    const request = await PaymentRequest.findOne({ _id: id });
    if (!request) return BaseResponse(res).error(400, "Request does not exist");
    request.status = status;
    request.reason = reason || "";
    await request.save();
    let notText;
    if (request.status === "declined")
      notText = "Your withdrawal request was rejected because" + reason;
    else if (request.status === "completed")
      notText = "User's withdrawal request has been completed.";
    Notification.sendNotification({
      userId: request.userId,
      text: notText,
      header: "Hash Rate Rejection",
      action: null,
      nextRoute: `/payment/withdraw/${id}`,
    });
    return BaseResponse(res).success(
      200,
      "Payment request status has been changed."
    );
  }
};
