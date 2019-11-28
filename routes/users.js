const usersRouter = require('express').Router();
const { retunrsUser } = require('../controllers/user');

usersRouter.get('/:id', retunrsUser);

module.exports = usersRouter;