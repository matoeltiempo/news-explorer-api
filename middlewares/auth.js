const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const NotUserAuthorization = require('../errors/not-user-authorization');
const { NeedToLogin, WrongData } = require('../config/message');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotUserAuthorization(NeedToLogin);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new NotUserAuthorization(WrongData);
  } req.user = payload;
  next();
};

module.exports = auth;