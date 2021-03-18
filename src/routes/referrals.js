const router = require('express').Router();
const Referrals = require('../controllers/referrals/Referrals');
const AuthenticationMiddlewares = require('../middlewares/AuthenticationMiddlewares');
router.get('/refferals/:email', AuthenticationMiddlewares.checkJWT, Referrals.getRefferals);
module.exports = router;