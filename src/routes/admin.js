const router = require('express').Router();
const Authentication = require('../controllers/admin/Authentication');
const Payments = require('../controllers/admin/Payments');
const AuthenticationMiddleware = require('../middlewares/AuthenticationMiddlewares');
router.post('/register', Authentication.createAdmin);
router.post('/login', Authentication.adminLogin);
router.get('/get-user-payments/:status', AuthenticationMiddleware.checkAdminJWT, Payments.getUserPayments);
module.exports = router;