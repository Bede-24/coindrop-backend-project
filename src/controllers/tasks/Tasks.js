const TaskSchema = require("../../data/models/Tasks");
const BaseResponse = require("../../services/BaseResponse");
module.exports = class Tasks {
    static async getTasks(req, res) {
        const {id} = req.params;
        const tasks = await TaskSchema.find({userId: id});
        return BaseResponse(res).success(200, "Tasks gotten successfully. ", tasks, true);
    }
    static async getTask(req, res) {
        const {id} = req.params;
        let tasks;
        try {
            tasks = await TaskSchema.findOne({_id: id});
            if(!tasks) return BaseResponse(res).error(404, "Task was not found");
        } catch(err) {
            return BaseResponse(res).error(404, "Task was not found");
        }
        return BaseResponse(res).success(200, "Tasks gotten successfully. ", tasks, true);
    }
}