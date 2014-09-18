require('./logs.js');
var requireAll = require('require-all-to-camel');
var data = requireAll(__dirname+'/controllers');

data.models = requireAll(__dirname+'/models');

module.exports = data;

