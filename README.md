restler-q [![Build Status](https://api.travis-ci.org/troupe/restler-q.png)](https://travis-ci.org/troupe/restler-q)
=========

(C) Andrew Newdigate (@suprememoocow), Licensed under the MIT-LICENSE

An extremely simple Q promises wrapper for [Don Wrong's Restler](https://github.com/danwrong/restler) library.


Installing
-----------------

    npm install restler-q


Using
-----------------

The interface is similar to Restler's interface:

```javascript
var rest = require('restler-q');

rest.get('https://api.github.com/orgs/Troupe/repos')
  .then(function(repos) {
    assert(Array.isArray(repos));
  })
  .nodeify(done);
```

If you would like to gain access to the response object, do it like this

```javascript
var rest = require('restler-q').spread; // Note the .spread on the end!
rest.get('https://api.github.com/orgs/Troupe/repos')
  .spread(function(repos, response) {
    // Use Q's `spread`, not `then` 
    assert(Array.isArray(repos));
  })
  .fail(function(err) {
    // err.response contains the HTTP Response
  })
  .nodeify(done);
```

Running the tests
-----------------

    npm install
    make test


TODO
-----------------
* Provide ability to call `abort` and `retry` methods.
