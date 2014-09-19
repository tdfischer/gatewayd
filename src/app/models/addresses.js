var db = require('../sequelize');
var Sequelize = require('sequelize');

var RippleAddress = db.define('addresses', {
  id: { 
		type: Sequelize.INTEGER, 
		primaryKey: true,
		autoIncrement: true
	},
  type: { 
    type: Sequelize.STRING, 
    notNull: true
  },
  primary_address: { 
    type: Sequelize.STRING,
    notNull: true
  },
  secondary_address: {
    type: Sequelize.STRING,
    unique: true
  },
  data: {
    type: Sequelize.STRING
  }
}, {
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

module.exports = RippleAddress;
