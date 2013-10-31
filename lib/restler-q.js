/* jshint node:true, unused:true */
"use strict";

var rest = require('restler');
var Q    = require('q');

function wrap(r) {
  var defer = Q.defer();

  r.on('success', function(result) {
    defer.resolve(result);
  });

  r.on('fail', function(result) {
    defer.reject(result);
  });

  r.on('error', function(err) {
    defer.reject(err);
  });

  r.on('abort', function() {
    defer.reject(new Error('Operation aborted'));
  });

  return defer.promise;
}

function wrapMethod(method) {
  return function() {
    var request = method.apply(rest, arguments);
    return wrap(request);
  };
}

module.exports = ['get','post','put','del','head', 'json', 'postJson'].reduce(function(memo, method) {
  var underlying = rest[method];
  if(underlying) {
    memo[method] = wrapMethod(underlying);
  }

  return memo;
}, {});
