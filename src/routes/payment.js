const router = require("express").Router();
const Payment = require('../controllers/payment/Payment');
const AuthenticationMiddlewares = require('../middlewares/AuthenticationMiddlewares');
const Validations = require('../middlewares/Validations');
router.post('/user-claims-payment',
    AuthenticationMiddlewares.checkJWT,
    Payment.userClaimsPayment);
module.exports = router;