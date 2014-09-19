var db = require('../sequelize');
var Sequelize = require('sequelize');

module.exports = db.define('payments', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  destination_address_id: { 
    type: Sequelize.INTEGER, 
    validate: { notNull: true }
  },
  source_address_id: { 
    type: Sequelize.INTEGER, 
    validate: { notNull: true }
  },
  to_amount: { 
    type: Sequelize.DECIMAL, 
    validate: { notNull: true }
  },
  to_currency: { 
    type: Sequelize.STRING, 
    validate: { notNull: true }
  },
  to_issuer: { 
    type: Sequelize.STRING, 
    validate: { notNull: true }
  },
  from_amount: { 
    type: Sequelize.DECIMAL, 
    validate: { notNull: true }
  },
  from_currency: { 
    type: Sequelize.STRING, 
    validate: { notNull: true }
  },
  from_issuer: { 
    type: Sequelize.STRING, 
    validate: { notNull: true }
  },
  status:{ 
    type: Sequelize.STRING 
  },
  uid: {
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
