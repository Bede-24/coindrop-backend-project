const router = require('express').Router();
const Authentication = require('../controllers/admin/Authentication');
const Payments = require('../controllers/admin/Payments');
const AuthenticationMiddleware = require('../middlewares/AuthenticationMiddlewares');
// auth
router.post('/register', Authentication.createAdmin);
router.post('/login', Authentication.adminLogin);

// payment
/**
 * Get user claims for payment to be able to verify payment.
 */
router.get('/user-payments/:status', AuthenticationMiddleware.checkAdminJWT, Payments.getUserPayments);


/**
 * Get withdrawal requests of users.
 */
router.get('/withdrawal-requests/:status', AuthenticationMiddleware.checkAdminJWT, Payments.getWithdrawalRequests);
router.post('/increase-hash-rate', AuthenticationMiddleware.checkAdminJWT, Payments.increaseUserHashRate);
router.post('/decline-hash-rate-increase', AuthenticationMiddleware.checkAdminJWT, Payments.declineHashRateRequest);
router.post('/change-withdrawal-status/:status/:id', AuthenticationMiddleware.checkAdminJWT, Payments.changeWithdrawalRequestStatus);


module.exports = router;