const usersRouter = require('express').Router();
const { returnsUser } = require('../controllers/user');

usersRouter.get('/me', returnsUser);

module.exports = usersRouter;