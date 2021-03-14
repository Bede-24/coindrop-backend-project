class BaseResponse {
    res;
    constructor(res) {
        this.res = res
    }
    success(status, message, data, customHandle = false) {
        this.res.status(status).json({
            status,
            message,
            data,
            customHandle
        })
    }
    error(status, message, customHandle= false, extraData) {
        this.res.status(status).json({
            error: true,
            status,
            message,
            customHandle,
            extraData
        })
    }
}
module.exports = (res) => new BaseResponse(res)