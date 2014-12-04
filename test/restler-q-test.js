var assert  = require('assert');
var rest    = require('../index');

describe('restler-q', function(){
  describe('#get()', function() {
    it('should resolve correctly', function(done) {
      rest.get('https://api.github.com/orgs/Troupe/repos')
        .then(function(repos) {
          assert(Array.isArray(repos));
        })
        .nodeify(done);
    });

    it('should fail correctly', function(done) {
      rest.get('https://api.github.com/orgs/Troupe123897123897123879132789123DOES_NOT_EXIST/repos')
        .then(function() {
          assert(false, 'Expected a failure');
        })
        .fail(function(err) {
          assert(!(err instanceof Error));
        })
        .nodeify(done);
    });

    it('should handle errors correctly', function(done) {
      rest.get('https://hostname_does_not_exist.11298371/')
        .then(function() {
          assert(false, 'Expected an error');
        })
        .fail(function(err) {
          assert(err instanceof Error);
        })
        .nodeify(done);
    });

  });
});

describe('restler-q-spread', function(){
  describe('#get()', function() {
    it('should resolve correctly', function(done) {
      rest.spread.get('https://api.github.com/orgs/Troupe/repos')
        .spread(function(repos, response) {
          assert(Array.isArray(repos));
          assert(response);
        })
        .nodeify(done);
    });

    it('should fail correctly', function(done) {
      rest.spread.get('https://api.github.com/orgs/Troupe123897123897123879132789123DOES_NOT_EXIST/repos')
        .spread(function() {
          assert(false, 'Expected a failure');
        })
        .fail(function(err) {
          assert(err);
          assert(err.response);
        })
        .nodeify(done);
    });

    it('should handle errors correctly', function(done) {
      rest.spread.get('https://hostname_does_not_exist.11298371/')
        .spread(function() {
          assert(false, 'Expected an error');
        })
        .fail(function(err) {
          assert(err instanceof Error);
        })
        .nodeify(done);
    });

  });
});

