const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const NoUrl = require('../config/message');

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
    require: true,
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
      message: NoUrl,
    },
  },
  image: {
    require: true,
    type: String,
    validate: {
      validator: (v) => isUrl(v),
      message: NoUrl,
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