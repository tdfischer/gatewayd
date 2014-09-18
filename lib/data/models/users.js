var db = require('../sequelize.js');
var Sequelize = require('sequelize');
const _ = require('underscore-node');

var User = db.define('user', {
  id: { 
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		notNull: true,
		unique: true,
	},
  federation_tag: Sequelize.STRING,
  admin: Sequelize.BOOLEAN,
  federation_name: Sequelize.STRING,
  kyc_id: Sequelize.INTEGER,
  name: { type: Sequelize.STRING, unique: true },
  salt: Sequelize.STRING,
  password_hash: Sequelize.STRING,
  external_id: Sequelize.STRING,
  data: Sequelize.STRING,
  uid: {
    type: Sequelize.STRING,
    unique: true
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  classMethods: {
    generateSalt: function() {
      var sha = crypto.createHash('sha256');
      return sha.update(crypto.randomBytes(128)).digest('hex');
    },
    saltPassword: function(pasword, salt) {
      return crypto.createHmac('sha256', salt).update(password).digest('hex');
    },
    createSecure: function(options, callback) {
      const salt = this.generateSalt();
      const passwordHash = this.saltPassword(options.password, salt);
      const user = _.extend({
        salt: salt,
        password_hash: passwordHash
      }, options);
      this.create(user).complete(callback);
    }
  },
  getterMethods: {
    data: function () {
      try {
        return JSON.parse(this.getDataValue('data'));
      } catch(e) {
        return this.getDataValue('data');
      }
    }
  },
  setterMethods: {
    data: function (value) {
      this.setDataValue('data', JSON.stringify(value));
    }
  }
});

module.exports = User;

