'use strict';

/**
 * module dependencies
 */
var superagent = module.exports = require('superagent');
var Request = superagent.Request;
var iconv = require('iconv-lite');

/**
 * add `charset` to request
 *
 * @param {String} enc : the encoding
 */
Request.prototype.charset = function(enc) {
  // check iconv supported encoding
  if (!iconv.encodingExists(enc)) {
    throw new Error('encoding not supported by iconv-lite');
  }

  // set the parser
  this._parser = function(res, cb) { // res not instanceof http.IncomingMessage
    var buffer = [];

    res.on('data', function(chunk) {
      buffer.push(chunk);
    });

    res.on('end', function(err) {
      var text, err;
      try {
        text = iconv.decode(Buffer.concat(buffer), enc);
      } catch (e) {
        err = e;
      } finally {
        res.text = text;
        cb(err);
      }
    });
  };

  return this;
};