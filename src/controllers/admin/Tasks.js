const User = require("../../data/models/User");
const BaseResponse = require("../../services/BaseResponse");
const TasksModel = require("../../data/models/Tasks");
const { pubnub } = require("../../services/provider");
module.exports = class Tasks {
    static async createUserTask(req, res) {
        const { userId, header, text, action, nextRoute } = req.body;
        if (!userId) return BaseResponse(res).error(400, 'userId is required to find the user with.');
        if (!header) return BaseResponse(res).error(400, 'header is required for proper presentation of data');
        if (!text) return BaseResponse(res).error(400, 'text is required for proper presentation of data');
        const user = await User.findOne({ _id: userId });
        if (!user) return BaseResponse(res).error(404, 'This user does not exist');
        const task = new TasksModel({ userId, header, text, action, nextRoute })
        await task.save();
        pubnub.publish({
            message: task,
            channel: `task-${userId}`,
        });
        return BaseResponse(res).success(200, "User's task has been added successfully.");
    }

}