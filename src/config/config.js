/* jshint -W079 */

var nconf = require('nconf');

nconf
  .file({ file: __dirname+'/config.json' })
  .env();

nconf.defaults({
  'ENVIRONMENT': 'production',
  'RIPPLE_REST_API': 'http://localhost:5990/',
  'SSL': true,
  'SSL_KEY_PATH': __dirname+'/../env/certs/server.key',
  'SSL_CERTIFICATE_PATH': __dirname+'/../env/certs/server.crt',
  'HTTP_SERVER': true, // Serve http/json api
  'BASIC_AUTH': true, // Require admin key for http api
  'KEY': false, // Required for BASIC_AUTH
  'WEBAPP_PATH': __dirname + '/../node_modules/ripple-gateway-webapp-example/',
  'PORT': 5000, // Port of http api server
  'HOST': 'localhost',
  'LOGGLY': false
});

module.exports = nconf;

