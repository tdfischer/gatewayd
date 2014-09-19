var db = require('../sequelize.js');
var Sequelize = require('sequelize');

var Transaction = db.define('transactions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  in_payment_id: { 
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  },
  out_payment_id: { 
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  },
  policy_id: { 
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  },
  state: { 
    type: Sequelize.STRING
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

module.exports = Transaction;

