const express = require('express');
const path = require('path');
const fallback = require('express-history-api-fallback');
const request = require('request');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const globalLog = require('global-request-logger');
const dotenv = require('dotenv').config();
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const session = require('express-session');

const app = express();
const root = path.resolve(__dirname);
app.set('port', process.env.PORT || 3000);

const mpRoutes = require('./routes/mp');
const msftRoutes = require('./routes/msft');

// globalLog.initialize();
// globalLog.on('success', function(request, response) {
//   console.log('SUCCESS');
//   console.log('Request', request);
//   console.log('Response', response);
// });
// globalLog.on('error', function(request, response) {
//   console.log('ERROR');
//   console.log('Request', request);
//   console.log('Response', response);
// });

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

// configure webpack-dev-middleware for hot reloading during development
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware');

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/dist/'
}));

// Facebook login
passport.use(new Strategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/callback',
  fields: ['emails', 'displayName']
}, (accessToken, refreshToken, profile, cb) => {
  console.log('PROFILE: ', profile);
  return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(session({ secret: 'spamoni', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// caching
const apicache = require('apicache');
const cache = apicache.middleware;

app.get('/api/cache/index', function(req, res, next) {
  res.send(apicache.getIndex());
});

app.get('/api/cache/clear', function(req, res, next) {
  res.status(200).send(apicache.clear());
});

app.use('/auth', passport.authenticate('facebook', { scope: ['emails'] }));

app.get('/auth/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  console.log(req.user);
  res.redirect('/');
});

app.use('/profile', (req, res) => {
  res.json(req.user);
});

//mp api routes
app.use('/api/mp', cache('1 week'), mpRoutes);
app.use('/api/msft', msftRoutes);

app.use('/dist', express.static(path.join(__dirname, './dist')));
app.use(fallback('index.html', { root }));

// handle 404s (and really all other errors, but it's most likely a 404 at this point)
app.use((req, res) => {
  res.status(404).send('Uh oh you\'ve found no man\'s land');
});

const server = app.listen(app.get('port'), () => {
  let port = server.address().port;
  console.log('Listening on port %s', port);
});
