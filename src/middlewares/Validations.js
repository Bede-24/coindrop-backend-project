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
        const { amount, cryptoAddress, coin, userId } = req.body;
        console.log(userId, "console user's id")
        if (isNaN(amount)) return BaseResponse(res).error(400, 'Amount must be a number');
        if (!cryptoAddress) return BaseResponse(res).error(400, 'Crypto address required to complete this transaction.');
        if (!coin) return BaseResponse(res).error(400, 'Crypto platform required to complete this transaction.');
        if (!userId) return BaseResponse(res).error(400, 'User\'s Id is required to complete this transaction.');
        next();
    }
    static checkUserClaimsPayment(req, res, next) {

        const { amount, id, upgradeType, coin } = req.body;
        if (!id) return BaseResponse(res).error(400, 'User\'s Id was not provided.');
        if (!upgradeType) return BaseResponse(res).error(400, 'Upgrade type was not provided.');
        if (!amount) return BaseResponse(res).error(400, 'Amount was not provided.');
        if (!coin) return BaseResponse(res).error(400, 'Coin was not provided.');
        else next();
    }
}