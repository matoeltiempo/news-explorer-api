const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const NotCorrectData = require('../errors/not-correct-data');
const { NoUserId, NoUserData } = require('../config/message');
const { JWT_DEV_SECRET } = require('../config/dev');

module.exports.returnsUser = (req, res, next) => User
  .findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError(NoUserId);
    } res.send({ user: user.name, email: user.email });
  }).catch(next);

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => {
      if (!user) {
        throw new NotCorrectData(NoUserData);
      } res.send({ user: user.name, email: user.email });
    }).catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true,
      }).end();
    }).catch(next);
};