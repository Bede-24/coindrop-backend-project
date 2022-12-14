const router = require("express").Router();
router.use('/authentication', require('./authentication'));
router.use('/payment', require('./payment'));
router.use('/admin', require('./admin'));
router.use('/user', require('./user'));
router.use('/notifications', require('./notifications'));
router.use('/referrals', require('./referrals'));
router.use('/application', require('./application'));
router.use('/tasks', require('./tasks'));
router.use('/tax', require('./tax'));
module.exports = router;