var database = require(__dirname+"/../sequelize.js");
var Sequelize = require("sequelize");

var Bridge = database.define('bridges', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  in_address_id: {
    type: Sequelize.STRING,
    validate: {
      notNull: true
    }
  },
  out_address_id: {
    type: Sequelize.INTEGER,
    validate: {
      notNull: true
    }
  },
  policy_id: {
    type: Sequelize.INTEGER
  }
});

module.exports = Bridge;

