const BaseResponse = require('../services/BaseResponse');
function emailTest(email) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(email)
}
module.exports = class Validations {
    static checkEmailAndPassword(req, res, next) {
        const { email, password, refEmail } = req.body;
        if (!emailTest(email)) return BaseResponse(res).error(400, 'Wrong format of email');
        else if (!password) return BaseResponse(res).error(400, 'Password was not provided.');
        else if (refEmail) {
            if (!emailTest(refEmail)) return BaseResponse(res).error(400, 'Wrong format of refferral email');
        }
        next();
    }
    static withdrawalRequests(req, res, next) {
        const {amount, cryptoAddress, coin, userId} = req.body;
        console.log(typeof amount, amount);
        if(isNaN(amount)) return BaseResponse(res).error(400, 'Amount must be a number');
        if(!cryptoAddress) return BaseResponse(res).error(400, 'Crypto address required to complete this transaction.');
        if(!coin) return BaseResponse(res).error(400, 'Crypto platform required to complete this transaction.');
        if(!userId) return BaseResponse(res).error(400, 'User\'s Id is required to complete this transaction.');
        next();
    }
}