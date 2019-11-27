require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errors } = require('celebrate');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
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

app.use(errorLogger);

app.use(errors());

app.listen(PORT);