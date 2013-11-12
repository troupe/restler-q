restler-q [![Build Status](https://api.travis-ci.org/troupe/restler-q.png)](https://api.travis-ci.org/troupe/restler-q.png)
=========

(C) Andrew Newdigate (@suprememoocow), Licensed under the MIT-LICENSE

An extremely simple Q promises wrapper for [Don Wrong's Restler](https://github.com/danwrong/restler) library.


Installing
-----------------

    npm install restler-q


Using
-----------------

The interface is similar to Restler's interface:

    var rest = require('restler-q');

    rest.get('https://api.github.com/orgs/Troupe/repos')
      .then(function(repos) {
        assert(Array.isArray(repos));
      })
      .nodeify(done);

Running the tests
-----------------

    npm install
    make test


TODO
-----------------
* Provide ability to call `abort` and `retry` methods.
