var assert = require('assert');
var request = require('../');

request.get('http://www.sohu.com/')
    .charset('gbk')
    .end(function(err,res) {
        assert(res.text.indexOf('搜狐') > -1);
    });