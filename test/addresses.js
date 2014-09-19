const Promise = require('bluebird');
const http = Promise.promisifyAll(require('supertest'));
const primaryAddress = 'stevenzeiler@ripple.com';
const addressType = 'ripple';
const Address = require(__dirname+'/src/app/models').address;

describe('Addresses', function() {

  it('should have a database table for addresses', function(done) {
    Address.create({
      primary: primaryAddress
      type: addresstype
    })
    .then(function(address) {
      assert(address.id > 0);
      assert.strictEqual(address.primary, primaryAddress);
      assert.strictEqual(address.type, addressType);
      address.destroy().complete(done);
    })
    .error(function(error) {
      throw new Error(error);
    });
  });

  it('should expose REST CRUD operations for addresses', function() {

    http
      .post('/v2/addresses')
      .send({
        primary: primaryAddress
        type: addresstype
      })
      .endAsync().then(function(response) {
        assert(address.id);
        assert(address.primary, primaryAddress);
        assert(address.type, addressType);
        done();
      })
      .error(function(error) {
        throw new Error(error);
      });
  });
});

