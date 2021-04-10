const Tasks = require('../controllers/tasks/Tasks');
const AuthenticationMiddlewares = require('../middlewares/AuthenticationMiddlewares');

const router = require('express').Router();
router.get('/tasks/:id', AuthenticationMiddlewares.checkJWT, AuthenticationMiddlewares.checkIfIdMatchesJWTId, Tasks.getTasks)
router.get('/task/:id', AuthenticationMiddlewares.checkJWT, Tasks.getTask)
module.exports = router;