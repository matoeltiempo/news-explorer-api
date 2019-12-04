const { celebrate, Joi } = require('celebrate');
const articleRouter = require('express').Router();
const { createArticle, returnsArticles, deleteArticle } = require('../controllers/article');
const auth = require('../middlewares/auth');

articleRouter.get('/', auth, returnsArticles);

articleRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri(),
    image: Joi.string().required().uri(),
  }),
}), auth, createArticle);

articleRouter.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24).required(),
  }),
}), auth, deleteArticle);

module.exports = articleRouter;