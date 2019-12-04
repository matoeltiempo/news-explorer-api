const usersRouter = require('express').Router();
const { returnsUser } = require('../controllers/user');
const auth = require('../middlewares/auth');

usersRouter.get('/me', auth, returnsUser);

module.exports = usersRouter;