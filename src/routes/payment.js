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
    
router.get('/get-withdrawal-request/:id',
    AuthenticationMiddlewares.checkJWT,
    Payment.getWithdrawalRequest);
router.get('/claimed-payments/:id',
    AuthenticationMiddlewares.checkJWT,
    AuthenticationMiddlewares.checkIfIdMatchesJWTId,
    Payment.getClaimedPayments);
router.get('/claimed-payment/:id',
    AuthenticationMiddlewares.checkJWT,
    Payment.getClaimedPayment);
module.exports = router;