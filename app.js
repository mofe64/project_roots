const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const AppError = require('./util/AppError');
const globalErrorHandler = require('./controllers/errorController');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//routers
const userRouter = require('./routers/userRoutes');
const categoryRouter = require('./routers/categoryRouter');
const accountRouter = require('./routers/accountRouter');

//

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(
  express.json({
    limit: '10kb',
  })
);
app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: false,
  })
);

app.use(
  session({
    secret: 'test',
    resave: true,
    saveUninitialized: true,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/account', accountRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

//setup global error handling
app.use(globalErrorHandler);

module.exports = app;
