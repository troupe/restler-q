/* jshint node:true, unused:true */
"use strict";

var url = require('url');

var rest = require('restler');
var Q    = require('q');

var restler_q = ['request', 'get','patch','post','put','del','head','json','postJson','putJson'].reduce(function(memo, method) {
    var underlying = rest[method];
    if(underlying) {
        memo[method] = wrapMethod(underlying);
        memo.spread[method] = wrapMethod(underlying, true);
    }
    return memo;
}, {
    spread: {},
    Request: rest.Request,
    parsers: rest.parsers,
    file: rest.file,
    data: rest.data,
    Service: Service,
    service: service
});

module.exports = restler_q;

function wrap(r, spread) {
    var defer = Q.defer();

    r.on('success', function(result, response) {
        if(spread) { return defer.resolve([ result, response ]); }
        defer.resolve(result);
    });

    r.on('timeout', function(ms) {
        var err = new Error('ETIMEDOUT');
        err.code = 'ETIMEDOUT';
        err.errno = 'ETIMEDOUT';
        err.syscall = 'connect';
        err.timeout = ms;
        err.url = url.format(r.url);
        defer.reject(err);
    });

    r.on('fail', function(err, response) {
        if(spread) { err.response = response; }
        if (!err.url) { err.url = url.format(r.url); }
        defer.reject(err);
    });

    r.on('error', function(err, response) {
        if(spread) { err.response = response; }
        if (!err.url) { err.url = url.format(r.url); }
        defer.reject(err);
    });

    r.on('abort', function() {
        var err = new Error('Operation aborted');
        err.url = url.format(r.url);
        defer.reject(err);
    });

    return defer.promise;
}

function wrapMethod(method, spread) {
    return function() {
        var request = method.apply(rest, arguments);
        return wrap(request, spread);
    };
}

function mixin(target, source) {
    source = source || {};
    Object.keys(source).forEach(function(key) {
        target[key] = source[key];
    });

    return target;
}

function Service(defaults) {
    defaults = defaults || {};
    if (defaults.baseURL) {
        this.baseURL = defaults.baseURL;
        delete defaults.baseURL;
    }
    this.defaults = defaults;
}

var url = require('url');

mixin(Service.prototype, {
    request: function(path, options) {
        return restler_q.request(this._url(path), this._withDefaults(options));
    },
    get: function(path, options) {
        return restler_q.get(this._url(path), this._withDefaults(options));
    },
    head: function(path, options) {
        return restler_q.head(this._url(path), this._withDefaults(options));
    },
    patch: function(path, options) {
        return restler_q.patch(this._url(path), this._withDefaults(options));
    },
    put: function(path, options) {
        return restler_q.put(this._url(path), this._withDefaults(options));
    },
    post: function(path, options) {
        return restler_q.post(this._url(path), this._withDefaults(options));
    },
    json: function(path, options) {
        return restler_q.json(this._url(path), this._withDefaults(options));
    },
    postJson: function(path, options) {
        return restler_q.postJson(this._url(path), this._withDefaults(options));
    },
    putJson: function(path, options) {
        return restler_q.putJson(this._url(path), this._withDefaults(options));
    },
    del: function(path, options) {
        return restler_q.del(this._url(path), this._withDefaults(options));
    },
    _url: function(path) {
        if (this.baseURL){
            return url.resolve(this.baseURL, path);
        }
        else {
            return path;
        }
    },
    _withDefaults: function(options) {
        var opts = mixin({}, this.defaults);
        return mixin(opts, options);
    }
});

function service(constructor, defaults, methods) {
    constructor.prototype = new Service(defaults || {});
    mixin(constructor.prototype, methods);
    return constructor;
}
