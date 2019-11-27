const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    validate: {
      validator: (v) => isEmail(v),
      message: "Неправильная почта",
    },
  },
  password: {
    required: true,
    type: String,
    minlength: [8, "от 8 символов"],
    select: false,
  },
  name: {
    require: true,
    type: String,
    minlength: [2, "от 2 символов"],
    maxlength: [30, "до 30 символов"],
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      } return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          } return user;
        });
    });
};

module.exports = mongoose.model("user", userSchema);