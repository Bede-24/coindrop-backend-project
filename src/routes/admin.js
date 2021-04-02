const router = require('express').Router();
const Authentication = require('../controllers/admin/Authentication');
const Payments = require('../controllers/admin/Payments');
const Users = require('../controllers/admin/Users');
const Tasks = require('../controllers/admin/Tasks');
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
router.patch('/increase-hash-rate', AuthenticationMiddleware.checkAdminJWT, Payments.increaseUserHashRate);
router.patch('/decline-hash-rate-increase', AuthenticationMiddleware.checkAdminJWT, Payments.declineHashRateRequest);
router.patch('/change-withdrawal-status/:status/:id', AuthenticationMiddleware.checkAdminJWT, Payments.changeWithdrawalRequestStatus);

router.patch('/change-user-blocked-status/isBlocked=:isBlocked/:id', AuthenticationMiddleware.checkAdminJWT, Users.changeIsBlockedStatus);
router.patch('/change-user-forceful-upgrade-status', AuthenticationMiddleware.checkAdminJWT, Users.changeForcefulUpgradeStatus);
router.patch('/change-pay-tax-status', AuthenticationMiddleware.checkAdminJWT, Users.changepayTaxStatus);
router.get('/user/:id', AuthenticationMiddleware.checkAdminJWT, Users.getUserById);
router.get('/users', AuthenticationMiddleware.checkAdminJWT, Users.getUsers);
router.get('/users-according-to-blocked-status/isBlocked=:isBlocked', AuthenticationMiddleware.checkAdminJWT, Users.getUsersAccordingToBlockedStatus);

router.post('/create-user-task',AuthenticationMiddleware.checkAdminJWT, Tasks.createUserTask);

module.exports = router;