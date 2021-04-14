const router = require("express").Router();
const Tax = require("../controllers/tax/Tax");
const AuthenticationMiddlewares = require('../middlewares/AuthenticationMiddlewares');
router.get('/get-tax/:id', AuthenticationMiddlewares.checkJWT, Tax.getTaxDetails);
router.post('/verify-task-payment', AuthenticationMiddlewares.checkJWT, Tax.userClaimsTaxPayment);

module.exports = router;