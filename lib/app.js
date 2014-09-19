var gateway = require(__dirname + '/../');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var userCtrl = require(__dirname + '/http/controllers/users');
var publicCtrl = require(__dirname + '/http/controllers/public');
var ApiRouter = require(__dirname+'/http/routers/api_router.js');
var resourcesRouter = require(__dirname+'/http/routers/resources_router.js');
var passportAuth = require(__dirname + '/http/passport_auth');
const cors = require('cors')();

process.env.DATABASE_URL = gateway.config.get('DATABASE_URL');

passport.use(passportAuth.adminBasic);
passport.use(passportAuth.userBasic);

var app = express();
app.use(cors);
app.use('/', express.static(gateway.config.get('WEBAPP_PATH')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(passport.initialize());

var apiRouter = new ApiRouter({
  passport: passport,
  authName: 'adminBasic'
});

if (gateway.config.get('BASIC_AUTH')) {
  app.use('/v1', passport.authenticate('adminBasic', { session: false }), resourcesRouter);
} else {
  app.use('/v1', resourcesRouter);
}

apiRouter.bind(app);

app.get('/ripple.txt', publicCtrl.rippleTxt);

var userAuth = function() {
  return passport.authenticate('userBasic', { session: false });
};

if (gateway.config.get('WEBAPP')) {
  app.get('/app', publicCtrl.webapp);
  app.post('/v1/register', publicCtrl.registerUser);

  app.post('/v1/users/login', userAuth(), publicCtrl.loginUser);
  app.get('/v1/users/:id', userAuth(), userCtrl.show);
  app.get('/v1/users/:id/external_accounts', userAuth(), userCtrl.externalAccounts);
  app.get('/v1/users/:id/external_transactions', userAuth(), userCtrl.externalTransactions);
  app.get('/v1/users/:id/ripple_addresses', userAuth(), userCtrl.rippleAddresses);
  app.get('/v1/users/:id/ripple_transactions', userAuth(), userCtrl.rippleTransactions);
}

module.exports = app;

