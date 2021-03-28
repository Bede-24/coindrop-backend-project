const TaskSchema = require("../../data/models/Tasks");
const BaseResponse = require("../../services/BaseResponse");
module.exports = class Tasks {
    static async getTasks(req, res) {
        const {id} = req.params;
        const tasks = await TaskSchema.find({_id: id});
        return BaseResponse(res).success(200, "Tasks gotten successfully. ", tasks, true);
    }
}