const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const articleSchema = new mongoose.Schema({
  keyword: {
    require: true,
    type: String,
  },
  title: {
    require: true,
    type: String,
  },
  text: {
    require: true,
    type: String,
  },
  date: {
    require: Date,
    type: String,
  },
  source: {
    require: true,
    type: String,
  },
  link: {
    require: true,
    type: String,
    validate: {
      validator: (v) => isUrl(v),
      message: "Не ссылка",
    },
  },
  image: {
    require: true,
    type: String,
    validate: {
      validator: (v) => isUrl(v),
      message: "Не ссылка",
    },
  },
  owner: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    select: false,
  },
});

module.exports = mongoose.model("article", articleSchema);