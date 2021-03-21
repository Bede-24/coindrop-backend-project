const router = require('express').Router();
const Application = require("../controllers/application/Application")
router.get('/crypto-market', Application.getCryptoMarket);
module.exports = router;