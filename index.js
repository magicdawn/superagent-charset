/**
 * superagent-charset
 *
 * e.g
 *
 * request.get(some_html_with_gbk)
 *     .charset('gbk')
 *     .end()
 */

var superagent = module.exports = require('superagent');
var Request = superagent.Request;
var iconv = require('iconv-lite');

Request.prototype.charset = function(enc) {
    if(!iconv.encodingExists(enc)){
        throw new Error('encoding not supported by iconv-lite');
    }

    this._parser = function(res,cb) { // res not instanceof http.IncomingMessage
        res.text = '';
        res.rawBuffer = new Buffer(0);

        res.on('data',function(chunk) {
            res.rawBuffer = Buffer.concat([res.rawBuffer,chunk]);
        });

        res.on('end',function(err) {
            res.text = iconv.decode(res.rawBuffer,enc);
            cb(err);
        });
    }

    return this;
};