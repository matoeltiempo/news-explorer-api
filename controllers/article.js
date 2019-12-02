const Article = require('../models/article');
const NotUserAuthorization = require('../errors/not-user-authorization');

module.exports.createArticle = (req, res, next) => {
  const { keywords, title, text, date, source, link, image } = req.body;
  Article.create({ keywords, title, text, date, source, link, image, owner: req.user._id })
    .then((article) => res.send({ data: article }))
    .catch((next));
};

module.exports.returnsArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => res.send({ data: article }))
    .catch((next));
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      const articleData = { data: article };
      if (JSON.stringify(articleData.data.owner) !== JSON.stringify(req.user._id)) {
        throw new NotUserAuthorization('Ошибка авторизации');
      } else {
        Article.findByIdAndRemove(req.params.articleId)
          .then(() => res.send(articleData))
          .catch(next);
      }
    }).catch(next);
};