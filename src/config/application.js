process.env.DATABASE_URL = gatewayd.config.get('DATABASE_URL');
const gatewayd = require(__dirname + '/../');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require(__dirname+'/passport.js'); 
const router = require(__dirname+'/routes.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(passport.initialize());

app.use('/', express.static(gatewayd.config.get('WEBAPP_PATH')));
app.use('/v1', adminAuthMiddlware, router);

function adminAuthMiddlware() {
  return passport.authenticate('adminBasic', { session: false });
}

module.exports = app;

