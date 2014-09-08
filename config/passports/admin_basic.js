const BasicStrategy = require('passport-http').BasicStrategy;
const gateway = require(__dirname + '/../../');

function verifyAdmin(username, password){
  if (username === gateway.config.get('KEY') ||
      password === gateway.config.get('KEY')) {
    return true;
  } else {
    return false;
  }
}

var adminBasicAuthStrategy = new BasicStrategy(
  function(username, password, done) {
    if (verifyAdmin(username, password)) {
      return done(null, { admin: true });
    } else {
      return done(null, false);
    }
  }
);

adminBasicAuthStrategy.name = 'adminBasic';

module.exports = adminBasicAuthStrategy;

