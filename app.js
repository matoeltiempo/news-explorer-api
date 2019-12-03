require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGODEV } = require('./config');

const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');
const createUserRouter = require('./routes/create-user');
const loginRouter = require('./routes/login');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000, MONGODB = MONGODEV } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);

app.use('/articles', articlesRouter);
app.use('/users', usersRouter);
app.use('/signup', createUserRouter);
app.use('/signin', loginRouter);

app.use('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  console.log('App is listening to port', PORT);
});