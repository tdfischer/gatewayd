var Sequelize = require('sequelize');
var config = require(__dirname+'/../config.js');

var databaseUrl = config.get('DATABASE_URL');

if (databaseUrl) {
  var match = databaseUrl.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  var db = new Sequelize(match[5], match[1], match[2], {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: false,
    native: true
  });
} else {
  throw new Error('DATABASE_URL env variable is required');
}

module.exports = db;
