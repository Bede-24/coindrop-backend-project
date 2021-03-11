const router = require("express").Router();
router.use('/authentication', require('./authentication'));
module.exports = router;