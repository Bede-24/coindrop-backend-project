const router = require("express").Router();
const  Authentication = require('../controllers/auth/Authentication');
const  AuthenticationMiddlewares = require('../middlewares/AuthenticationMiddlewares');
router.post('/register', AuthenticationMiddlewares.checkIfUserAlreadyExists, Authentication.register);
module.exports = router;