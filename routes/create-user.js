const { celebrate, Joi } = require('celebrate');
const createUserRouter = require('express').Router();
const { createUser } = require('../controllers/user');

createUserRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

module.exports = createUserRouter;