const router = require("express").Router();
const Payment = require('../controllers/payment/Payment');
const AuthenticationMiddlewares = require('../middlewares/AuthenticationMiddlewares');
const Validations = require('../middlewares/Validations');
router.post('/user-claims-payment',
    AuthenticationMiddlewares.checkJWT,
    Payment.userClaimsPayment);
router.post('/make-withdrawal-request',
    AuthenticationMiddlewares.checkJWT,
    Validations.withdrawalRequests,
    Payment.makeWithdrawalRequest);
router.get('/get-withdrawal-requests/:id',
    AuthenticationMiddlewares.checkJWT,
    AuthenticationMiddlewares.checkIfIdMatchesJWTId,
    Payment.getWithdrawalRequests);
module.exports = router;