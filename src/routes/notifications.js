const router = require('express').Router();
const Notifications = require('../controllers/notifications/Notifications');
const AuthenticationMiddlewares = require('../middlewares/AuthenticationMiddlewares');
router.get('/notifications/:id',
    AuthenticationMiddlewares.checkJWT,
    AuthenticationMiddlewares.checkIfIdMatchesJWTId, 
    Notifications.getNotifications);
module.exports = router;