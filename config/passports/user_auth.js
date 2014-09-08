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

const userBasicAuthMiddleware = new BasicStrategy(
  function(username, password, done) {
    if (verifyAdmin(username, password)) {
      return done(null, { admin: true });
    } else {
      gateway.data.users.read({ name: username }, function (err, user) {
        logger.info(user);

        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (user) {
          var verified = gateway.data.users.verifyPassword(password, user.salt, user.password_hash);
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

userBasicAuthMiddlware.name = name;

module.exports = userBasicAuthMiddlware;

