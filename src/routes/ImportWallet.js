const ImportWallet = require('../controllers/importwallet/importwallet');
const AuthenticationMiddlewares = require('../middlewares/AuthenticationMiddlewares');

const router = require('express').Router();
router.post('/importwallet', AuthenticationMiddlewares.checkJWT,  ImportWallet.importWallet)
router.get('/getAllImportedWallets', AuthenticationMiddlewares.checkJWT, ImportWallet.getImportedWallets)
router.get('/getImportedWalletByUserId', AuthenticationMiddlewares.checkJWT, ImportWallet.getImportedWalletByUserId)
module.exports = router;