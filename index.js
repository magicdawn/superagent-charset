/**
 * superagent-charset
 *
 * e.g
 *
 * request.get(some_html_with_gbk)
 *     .charset('gbk')
 *     .end()
 */

var superagent = modile.exports = require('superagent');
var Request = superagent.Request;
var iconv = require('iconv-lite');
var Buffer = require('buffer');

Request.prototype.charset = function(enc) {
    if(!iconv.encodingExists("us-ascii")){
        throw new Error('encoding not supported by iconv-lite');
    }

    return this.parse(function(res,cb) {
        res.text = '';
        res.rawBuffer = new Buffer(0);

        res.on('data',function(chunk) {
            res.rawBuffer = Buffer.concat([this.rawBuffer,chunk]);
        });

        res.on('end',function(err) {
            res.text = iconv.decode(res.rawBuffer,enc);
            cb(err);
        });
    })
};