const router = require("express").Router();
const Authentication = require('../controllers/auth/Authentication');
const AuthenticationMiddlewares = require('../middlewares/AuthenticationMiddlewares');
const Validations = require('../middlewares/Validations');
router.post('/register',
    Validations.checkEmailAndPassword,
    AuthenticationMiddlewares.checkIfUserAlreadyExists,
    Authentication.register);
router.post('/login',
    Validations.checkEmailAndPassword,
    AuthenticationMiddlewares.loginCheck,
    Authentication.login);
module.exports = router;