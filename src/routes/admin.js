const router = require('express').Router();
const Authentication = require('../controllers/admin/Authentication')
router.post('/register', Authentication.createAdmin);
router.post('/login', Authentication.adminLogin);
module.exports = router;