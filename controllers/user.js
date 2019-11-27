const User = require('../models/user');
const NotCorrectId = require('../errors/not-correct-id');

module.exports.retunrsUser = (req, res, next) => User
  .findOne({ _id: req.params.UserId })
  .then((user) => {
    if (!user) {
      throw new NotCorrectId('Нет пользователя с таким id');
    } res.send(user);
  }).catch(next);