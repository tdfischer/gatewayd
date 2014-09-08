const BasicStrategy = require('passport-http').BasicStrategy;
const gatewayd = require(__dirname + '/../../');

function verifyAdmin(username, password){
  if (username === gatewayd.config.get('KEY') ||
      password === gatewayd.config.get('KEY')) {
    return true;
  } else {
    return false;
  }
}

var userBasicAuthStrategy = new BasicStrategy(
  function(username, password, done) {
    if (verifyAdmin(username, password)) {
      return done(null, { admin: true });
    } else {
      gatewayd.data.users.read({ name: username }, function (err, user) {
        logger.info(user);

        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (user) {
          var verified = gatewayd.data.users.verifyPassword(password, user.salt, user.password_hash);
          if (verified) {
            return done(null, user);
          } else {
            return done(null, null);
          }
        }
        return done(null, user);
      });
    }
  }
);

userBasicAuthStrategy.name = 'userBasic';

module.exports = userBasicAuthStrategy;

