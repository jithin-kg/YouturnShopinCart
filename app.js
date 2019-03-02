const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const validator = require('express-validator');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const hbs = require('hbs');

const app = express();

mongoose.connect("mongodb://localhost:27017/ShoppingCart",{useNewUrlParser:true});
require('./config/passport'); // load passport config file

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('trust proxy',1);

hbs.registerPartials(path.join(__dirname,'/views/partials'));

//csrf protection
let csrfProtection = csrf({ cookie: true })
let parseForm = bodyParser.urlencoded({ extended: false })

app.use(logger('dev'));
app.use(express.json());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(express.urlencoded({ extended: false }));
// app.use()
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"its very secret",
      resave:false,
      saveUninitialized:true,
      cookie: {secret:true}

  }));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
