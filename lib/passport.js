const passport = require('passport'); 
const passports = requireAll(__dirname+'/../config/passports/');

//Object.keys(passports).forEach(passport.use);

//passport.use(passports.userBasic);
//passport.use(passports.adminBasic);

module.exports = passport;

