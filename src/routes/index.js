const router = require("express").Router();
router.use('/authentication', require('./authentication'));
router.use('/payment', require('./payment'));
router.use('/admin', require('./admin'));
router.use('/user', require('./user'));
module.exports = router;