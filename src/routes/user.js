const router = require('express').Router();
const AuthenticationMiddlewares = require('../middlewares/AuthenticationMiddlewares');
const UserController = require('../controllers/user/User');
router.get('/user-profile/:id',
    AuthenticationMiddlewares.checkJWT,
    AuthenticationMiddlewares.checkIfIdMatchesJWTId,
    UserController.getUserProfile);
router.patch('/update-user-profile/:id',
    AuthenticationMiddlewares.checkJWT,
    AuthenticationMiddlewares.checkIfIdMatchesJWTId,
    UserController.updateProfile);
module.exports = router;