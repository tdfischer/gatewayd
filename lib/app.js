const requireAll = require('require-all-to-camel');
const gatewayd = require(__dirname + '/../');
process.env.DATABASE_URL = gatewayd.config.get('DATABASE_URL');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require(__dirname+'/passport.js'); 
const routers = requireAll(__dirname+'/routers/');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(passport.initialize());

app.use('/', express.static(gatewayd.config.get('WEBAPP_PATH')));
//app.use('/', routers.publicRouter);
app.use('/v1', adminAuthMiddleware, routers.apiRouter);
app.use('/v1', adminAuthMiddleware, routers.resourcesRouter);
app.use('/v1', userAuthMiddleware, routers.userRouter);

function userAuthMiddleware() {
  return passport.authenticate('userBasic', { session: false });
}

function adminAuthMiddleware() {
  return passport.authenticate('adminBasic', { session: false });
}

module.exports = app;

