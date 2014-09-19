var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.changeColumn('external_accounts', 'user_id', {
    type: 'int'
  }, callback);
};

exports.down = function(db, callback) {
  db.changeColumn('external_accounts', 'user_id', {
    type: 'int',
    notNull: true
  }, callback);
};
