var Sequelize = require('sequelize');
var config = require(__dirname+'/../config.js');

var databaseUrl = config.get('DATABASE_URL');

if (databaseUrl) {
  var match = databaseUrl.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  var database = new Sequelize(match[5], match[1], match[2], {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: false,
    native: true
  }, {
    underscored: true
  });
} else {
  var database = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: __dirname+'/../../config/database.sqlite'
  })
}

module.exports = database;
