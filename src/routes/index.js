const router = require("express").Router();
router.use('/authentication', require('./authentication'));
router.use('/payment', require('./payment'));
router.use('/admin', require('./admin'));
module.exports = router;