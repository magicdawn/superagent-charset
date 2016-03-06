'use strict';

/**
 * module dependencies
 */

const iconv = require('iconv-lite');

/**
 * install the charset()
 */

module.exports = function install(superagent) {
  const Request = superagent.Request;

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
      const buffer = [];

      res.on('data', function(chunk) {
        buffer.push(chunk);
      });

      res.on('end', function() {
        let text, err;
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

  return superagent;
};