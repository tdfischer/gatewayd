const passport = require('passport'); 
const passports = requireAll(__dirname+'/../config/passports/');

Object.keys(passports).forEach(passport.use);

module.exports = passport;

