const Article = require('../models/article');

module.exports.createArticle = (req, res, next) => {
  const { keywords, title, text, date, source, link, image } = req.body;
  Article.create({ keywords, title, text, date, source, link, image, owner: req.user._id })
    .then((article) => res.send({ data: article }))
    .catch((next));
};