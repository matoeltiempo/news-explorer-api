const { celebrate, Joi } = require('express').Router;
const router = require('express').Router();

router.get('/', returnsArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().require(),
    title: Joi.string().require(),
    text: Joi.string().require(),
    date: Joi.string().require(),
    source: Joi.string().require(),
    link: Joi.string().require().uri(),
    image: Joi.string().require().uri(),
  }),
}), createArticles);

router.delete('/', celebrate({
  articledId: Joi.string().alphanum().length(24).required(),
}) deleteArticle);

module.exports = router;